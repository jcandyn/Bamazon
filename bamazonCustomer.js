var mysql = require("mysql");
let inquirer = require("inquirer")
let item_id_input;
let item_quantity_input;
let inventory;
let updated_quantity;



function inquirePrompt() {
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: "input",
        message: "What is the id of the item you would like to buy?",
        name: "item_id_input"
      },
      {
          type: "input",
          message: "How many items with that id would you like to buy?",
          name: "item_quantity_input" 
      }
  ])
  .then(answers => {
    console.log(answers)
    item_id_input = answers.item_id_input
    item_quantity_input = answers.item_quantity_input
    checkInventory()
    // Use user feedback for... whatever!!
  });
}






var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products;", function(err, res) {
      if (err) throw err;
      console.table(res);
      inquirePrompt()
    });
  }

  function checkInventory() {
    connection.query("SELECT stock_quantity FROM products WHERE item_id =? ;", [item_id_input], function(err, res) {
        if (err) throw err;
        console.log(res);
        inventory = res[0].stock_quantity
        checkInventoryAvailability()
      });
  }

  function checkInventoryAvailability() {
      if (item_quantity_input > inventory) {
          console.log("Insufficient quantity!")
      }
      else if ((item_quantity_input < inventory) || (item_quantity_input === inventory)) {
          UpdateInventory()
      }
  }

  function UpdateInventory() {
      console.log(inventory)
      console.log(item_quantity_input)
      updated_quantity = inventory - item_quantity_input
      console.log(updated_quantity)
    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: updated_quantity
      },
      {
        item_id: item_id_input
      }
    ], function(err, res) {
        if (err) throw err;
        console.log("You have succesfully purchased this item!")
        console.table(res);
        showUpdatedTable()
      });
  }


function showUpdatedTable() { 
        connection.query("SELECT * FROM products;", function(err, res) {
          if (err) throw err;
          console.table(res);
          connection.end();
        });
}
