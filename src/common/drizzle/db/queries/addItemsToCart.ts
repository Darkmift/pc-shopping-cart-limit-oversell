import { sql } from 'drizzle-orm';

const DROP_IF_EXISTS_ADD_ITEMS_TO_CART_PROCEDURE = sql.raw(/*sql*/`DROP PROCEDURE IF EXISTS addItemsToCart;`);
const ADD_ITEMS_TO_CART_PROCEDURE = sql.raw(/*sql*/`
CREATE PROCEDURE addItemsToCart(IN p_cartId INT, IN p_productId INT, IN p_amount INT)
BEGIN
    DECLARE availableCount INT;
    DECLARE error_message VARCHAR(255);

    -- Calculate the available inventory items where cartId is NULL
    SELECT COUNT(*) INTO availableCount 
    FROM products_inventory 
    WHERE productId = p_productId AND cartId IS NULL;

    -- Check if there are enough available inventory items
    IF availableCount < p_amount THEN
        -- Not enough inventory available, set an error message and signal an error
        SET error_message = CONCAT('Not enough inventory for product ID ', p_productId, ': ', availableCount, ' available, ', p_amount, ' requested.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    ELSE
        -- Update the products_inventory table to assign the cartId to the selected products
        UPDATE products_inventory
        SET cartId = p_cartId
        WHERE productId = p_productId AND cartId IS NULL
        ORDER BY id ASC
        LIMIT p_amount;

        -- After updating, select the updated rows to return them
        SELECT * FROM products_inventory
        WHERE productId = p_productId AND cartId = p_cartId
        ORDER BY id ASC
        LIMIT p_amount;
    END IF;
END
`);

export {
  ADD_ITEMS_TO_CART_PROCEDURE,
  DROP_IF_EXISTS_ADD_ITEMS_TO_CART_PROCEDURE,
};
