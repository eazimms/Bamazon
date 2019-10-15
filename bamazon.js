var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  // Connection setup for mysql

  port: 3306, 
  user: 'root', 
  password: '', 
  database: "bamazon"
}); 

connection.connect((error)=>{
  if (error) {
    console.log('Error connecting' + error.stack);
    return; 
  }; 
  console.log('Connected as' + connection.threadId);

  checkInv();
  
});

// function start() {
//   inquirer.prompt({
//     name: 'BamazonMain',
//     type: 'list',
//     choices: ['Check Inventory', 'Buy', 'Checkout']

//   })
//   .then(function(answer){
//     if (answer.BamazonMain === 'Check Inventory') {
//       checkInv();
//     }
//   })

  
// }
// Check the inventory of the items in stock. 
function checkInv() {
  connection.query('SELECT * FROM products', function (error, res) {
    if (error) {
      console.log('There was an error: ' + error)
    }

    console.table(res);
    choosePurchase();

    // var choiceArray = []; 
            // for (var i =0; i < res.length; i++) {
            //   choiceArray.push(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity);
            // } 
            // --Clearing this out, data looks better as a console.table than splitting with a for loop, also easier to code. Leaving it in for 
            // later use. 
    
  });

  
}

// Making a purchase, 

function choosePurchase() {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'productChoice', 
      message: 'Enter the ID of the item you would like to purchase!'
    },
    {
      type: 'input', 
      name: 'quantity', 
      message: 'How many do you want?'
    }
  ]).then(function(answer) {
    var items = parseInt(answer.productChoice); 
    var numOf = answer.quantity; 
    connection.query(`SELECT * FROM products WHERE item_id = ${items}`, function (error, res){
      if(error) {
        console.log('There was an error' + error.stack); 
        return; 
      }
      else products = res[0]; 
      if(products.stock_quantity > numOf) {
        console.log('We have those in stock!')
        checkOut(); 

        function checkOut() {
          var newQuantity = products.stock_quantity - numOf; 
          var total = numOf * products.price; 
        
          connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${items}`, function(err, res){
            if (err) {
              console.log(err);
            }
            else console.log(`Your total is: $${total}`); 
            checkInv(); 
          }); 
        }
      } 
      else {
        console.log("Sorry, we don't have that many in stock."); 
        checkInv(); 
      }



    });
  });
}










            

  