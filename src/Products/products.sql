USE defaultdb;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    category_id INT DEFAULT NULL,
    id INT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (id) REFERENCES users(id)
);

SELECT * FROM products;

SELECT * FROM products WHERE product_id = 1;

INSERT INTO products (product_code, product_name, description, price, stock, category_id, id) 
VALUES ('PRD001', 'Burger', 'Classic beef burger', 99.00, 100, 1, 1);

UPDATE products SET product_code = '', product_name = '', description = '', price = '', stock = '', category_id = '', id = '' 
WHERE product_id = 1;

DELETE FROM products WHERE product_id = 1;
