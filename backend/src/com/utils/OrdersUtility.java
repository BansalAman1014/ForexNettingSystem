package com.utils;

import java.sql.Date;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.models.CurrencyPair;
import com.models.Order;
import com.models.OrderStatus;
import com.models.OrderType;
import com.models.User;

public class OrdersUtility {
	static private SessionFactory sessionFactory;
	private UserUtilities userUtil;
	private CurrencyPairUtility currencyPairUtility;

	public OrdersUtility() {
		try {
			Configuration config = new Configuration();
			config.configure("hibernate.cfg.xml");
			sessionFactory = config.buildSessionFactory();
			userUtil = new UserUtilities();
			currencyPairUtility = new CurrencyPairUtility();
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
			e.printStackTrace();
			System.out.println("Exception ocured while saving user and exception was " + e);
		} finally {
			if (session != null)
				session.close();
		}
		return null;
	}

}
