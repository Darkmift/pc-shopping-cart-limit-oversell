import { sql } from 'drizzle-orm';

const DROP_IF_EXISTS_ADD_ITEMS_TO_CART_PROCEDURE = sql`DROP PROCEDURE IF EXISTS addItemsToCart;`;
const ADD_ITEMS_TO_CART_PROCEDURE = sql`
CREATE PROCEDURE addItemsToCart(IN p_cartId INT, IN p_productId INT, IN p_amount INT)
BEGIN
    DECLARE availableCount INT;
    DECLARE error_message VARCHAR(255);

    START TRANSACTION;

    SELECT COUNT(*) INTO availableCount 
    FROM products_inventory 
    WHERE productId = p_productId AND cartId IS NULL;

    IF availableCount < p_amount THEN
        ROLLBACK;
        SET error_message = CONCAT('Not enough inventory for product ID ', p_productId, ': ', availableCount, ' available, ', p_amount, ' requested.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    ELSE
        UPDATE products_inventory
        SET cartId = p_cartId
        WHERE productId = p_productId AND cartId IS NULL
        ORDER BY id ASC
        LIMIT p_amount;
        COMMIT;
    END IF;
END
`;

export {
  ADD_ITEMS_TO_CART_PROCEDURE,
  DROP_IF_EXISTS_ADD_ITEMS_TO_CART_PROCEDURE,
};
