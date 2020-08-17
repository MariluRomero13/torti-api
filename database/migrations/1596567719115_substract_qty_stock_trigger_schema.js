'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema =  use('Schema')
const Database = use('Database')

class SubstractQtyStockTriggerSchema extends Schema {
  async up () {
    await Database.raw(`
    CREATE TRIGGER substract_qty_stock
    AFTER INSERT ON
    sale_details
    FOR EACH ROW
    BEGIN
    DECLARE new_quantity INTEGER;
    DECLARE current_quantity INTEGER;
    DECLARE assignment_product_id INTEGER;

SET assignment_product_id := (SELECT id FROM assingments_products 
WHERE assingments_products.stock_id = (SELECT id FROM stocks WHERE stocks.product_id = new.product_id) 
AND assingments_products.employee_id = (SELECT assignments_customers.employee_id FROM sales 
INNER JOIN assingments_customers_details ON sales.assignments_customers_details_id = assingments_customers_details.id
INNER JOIN assignments_customers ON assignments_customers.id = assingments_customers_details.assignments_customers_id
WHERE sales.id = new.sale_id));
SET @current_quantity := (SELECT quantity FROM assingments_products WHERE assingments_products.id = assignment_product_id);
IF @current_quantity  >= new.quantity THEN
	SET @new_quantity := @current_quantity - new.quantity;
	UPDATE assingments_products SET assingments_products.quantity = @new_quantity WHERE assingments_products.id = assignment_product_id;
END IF;
END `
                )
  }

  async down () {
    await Database.raw(`DROP TRIGGER IF EXISTS substract_qty_stock;`)
  }
}

module.exports = SubstractQtyStockTriggerSchema
