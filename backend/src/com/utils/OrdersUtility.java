package com.utils;

import java.sql.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.models.CurrencyPair;
import com.models.Order;
import com.models.OrderMapping;
import com.models.OrderStatus;
import com.models.OrderType;
import com.models.User;

public class OrdersUtility {
	static private SessionFactory sessionFactory;
	private UserUtilities userUtil;
	private CurrencyPairUtility currencyPairUtility;
	private OrderMappingUtility orderMappingUtility;

	public OrdersUtility() {
		try {
			Configuration config = new Configuration();
			config.configure("hibernate.cfg.xml");
			sessionFactory = config.buildSessionFactory();
			userUtil = new UserUtilities();
			currencyPairUtility = new CurrencyPairUtility();
			orderMappingUtility = new OrderMappingUtility();
		} catch (Exception e) {
			System.out.println("Exception occurred at " + this.getClass().getName() + " and the error was " + e);
		}

	}

	public Order addOrder(Double notionalAmount, Date orderedDate, OrderStatus status, OrderType type,
			Integer currencyPair_id, Integer user_id) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			Transaction transaction = session.getTransaction();
			transaction.begin();
			User user = userUtil.getUserById(user_id);
			CurrencyPair currencyPair = currencyPairUtility.getCurrencyPairById(currencyPair_id);
			Order order = new Order();
			order.setNotionalAmount(notionalAmount);
			order.setOrderedDate(orderedDate);
			order.setStatus(status);
			order.setType(type);
			order.setCurrencyPair(currencyPair);
			order.setUser(user);
			session.save(order);
			transaction.commit();
			return order;
		} catch (Exception e) {
			System.out.println("Exception ocured while saving user and exception was " + e);
		} finally {
			if (session != null)
				session.close();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public OrderMapping executeOrCancelBuyOrder(Order buyOrder) {
		Session session = null;
		OrderMapping orderMapping = null;
		try {
			session = sessionFactory.openSession();
			Transaction transaction = session.getTransaction();
			transaction.begin();
			String query = String.format(
					"from Order where currencyPair=%d and type='%s' and notionalAmount=%f and status='%s'",
					buyOrder.getCurrencyPair().getId(), OrderType.SELL, buyOrder.getNotionalAmount(),
					OrderStatus.OPENED);
			List<Order> sellOrders = (List<Order>) session.createQuery(query).list();
			if (sellOrders.isEmpty()) {
				buyOrder.setStatus(OrderStatus.CANCELED);
				session.update(buyOrder);
			} else {
				Order sellOrder = sellOrders.get(0);
				orderMapping = orderMappingUtility.addTransaction(buyOrder, sellOrder);
				buyOrder.setStatus(OrderStatus.EXECUTED);
				sellOrder.setStatus(OrderStatus.EXECUTED);
				session.update(buyOrder);
				session.update(sellOrder);
			}
			transaction.commit();
		} catch (Exception e) {
			System.out.println("Exception ocured while saving user and exception was " + e);
		} finally {
			if (session != null)
				session.close();
		}
		return orderMapping;
	}

	@SuppressWarnings("unchecked")
	public List<Order> getOrders(User user, List<OrderStatus> orderStatuses, String dateInMilliSec,
			OrderType orderType) {
		Session session = null;
		List<Order> orders = null;
		try {
			session = sessionFactory.openSession();
			Transaction transaction = session.getTransaction();
			transaction.begin();
			Criteria criteria = session.createCriteria(Order.class);
			Criterion userCriterion = Restrictions.and(Restrictions.eq("user", user));
			Criterion statusCriterion = Restrictions.in("status", orderStatuses);
			criteria.add(userCriterion);
			criteria.add(statusCriterion);
			if (dateInMilliSec != null && !dateInMilliSec.equals("")) {
				Date date = new Date(Long.parseLong(dateInMilliSec));
				Criterion dateCriterion = Restrictions.and(Restrictions.eq("orderedDate", date));
				criteria.add(dateCriterion);
			}
			if (orderType != null) {
				Criterion typeCriterion = Restrictions.and(Restrictions.eq("type", orderType));
				criteria.add(typeCriterion);
			}
			orders = (List<Order>) criteria.list();
			transaction.commit();
		} catch (Exception e) {
			System.out.println("Exception ocured while saving user and exception was " + e);
		} finally {
			if (session != null)
				session.close();
		}
		return orders;
	}
}
