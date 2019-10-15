var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({

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
  connection.query('SELECT * FROM products', function(error, res){
    if (error) throw error; 
    inquirer
      .prompt([
        {
          name: 'choices', 
          type: 'rawlist',
          choices: function() {
            var choiceArray = []; 
            for (var i =0; i < res.length; i++) {
              choiceArray.push(res[i].product_name + " " +  res[i].price + ' ' + 'Amount in stock: ' + res[i].stock_quantity);
            }

            ;

            return choiceArray; 
          }
        }
      ]);
  });
}