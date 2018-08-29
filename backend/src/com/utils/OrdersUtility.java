package com.utils;

import java.sql.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

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
					"from Order where currencyPair_id=%d and type='SELL' and notional_amount=%f and status='OPENED' LIMIT 1",
					buyOrder.getCurrencyPair().getId(), buyOrder.getNotionalAmount());
			List<Order> sellOrders = (List<Order>) session.createQuery(query).list();
			if (sellOrders.isEmpty()) {
				buyOrder.setStatus(OrderStatus.CANCELED);
				session.save(buyOrder);
			} else {
				Order sellOrder = sellOrders.get(0);
				orderMapping = orderMappingUtility.addTransaction(buyOrder, sellOrder);
				buyOrder.setStatus(OrderStatus.EXECUTED);
				sellOrder.setStatus(OrderStatus.EXECUTED);
				session.save(buyOrder);
				session.save(sellOrder);
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
}
