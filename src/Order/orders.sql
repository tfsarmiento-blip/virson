USE defaultdb;

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(100) NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    id INT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (id) REFERENCES users(id)
);

SELECT * FROM orders;

SELECT * FROM orders WHERE order_id = 1;

INSERT INTO orders (order_code, product_id, quantity, total_price, status, id) 
VALUES ('ORD001', 1, 2, 198.00, 'pending', 1);

UPDATE orders SET order_code = '', product_id = '', quantity = '', total_price = '', status = '', id = '' 
WHERE order_id = 1;

DELETE FROM orders WHERE order_id = 1;
