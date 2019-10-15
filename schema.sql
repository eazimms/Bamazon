DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (328, "Booster Pack", "Magic: The Gathering", 3.99, 20),
	   (209, "Bundle", "Magic: The Gathering", 49.99, 13),
	   (313, "Commander Deck", "Magic: The Gathering", 34.99, 6),
	   (3141, "RX580", "Computer Parts", 199.99, 8),
	   (504, "Ryzen 3700X", "Computer Parts", 399.99, 15),
	   (292, "Ryzen 3500x", "Computer Parts", 199.99, 89),
	   (153, "16GB Ram", "Computer Parts", 99.99, 61),
	   (808, "Pig Ears", "Dog supplies", 4.99, 100),
	   (934, "Dog Bed", "Dog supplies", 29.99, 298),
	   (1351, "Kong", "Dog Supplies", 9.99, 28)