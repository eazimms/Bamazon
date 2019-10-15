var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({

  port: 3306, 
  user: 'root', 
  password: 'R0senrot!', 
  database: "bamazon"
}); 

connection.connect((error)=>{
  if (error) {
    console.log('Error connecting' + error.stack);
    return; 
  }; 
  console.log('Connected as' + connection.threadId);

  start();
  
});

function start() {
  inquirer.prompt({
    name: 'BamazonMain',
    type: 'list',
    choices: ['Check Inventory', 'Buy', 'Checkout']

  })
  .then(function(answer){
    if (answer.BamazonMain === 'Check Inventory') {
      checkInv();
    }
  })

  
}

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
    var items = praseInt(answer.productChoice); 
    var numOf = answer.quantity; 
    connection.query('SELECT * FROM products WHERE item_id =${item}', function (error, res){
      if(error) {
        console.log('There was an error' + error.stack); 
        return; 
      }
      else products = res[0]; 
      if(products.stock_quantity > numOf) {
        console.log('We have those in stock!')
      } 
      else {
        console.log('Sorry, we don/t have that many ins stock.'); 
      }



    })
  })
}




    // 
            

  