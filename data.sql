DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INT(10) NOT NULL,
stock_quantity INT(10) NOT NULL
);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Guitar","Music",120,10),
		("Massage Table","Furniture",300,2),
        ("Computer","Electronics",2000,5),
        ("Backpack","Apparel",40,5),
        ("TV","Electronics",600,3);
        

SELECT * FROM products;
