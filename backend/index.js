const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/data/img', express.static(path.join(__dirname, './data/img')));

//the json format is 
/*
  title: string
  description: string
  img: string
  price: number
  inventory: number
*/
//getting all the products from the products.json file
app.get("/products", (req, res) => {
  let body = [];

  const rawproducts = fs.readFileSync("./data/products.json");
  const products = JSON.parse(rawproducts);
  if(req.query.title != undefined){
    const queryTitle = req.query.title.toLowerCase();
    products.forEach((product) => {
      const productItem = product.title.toLowerCase();
      if(productItem.includes(queryTitle)){
        body.push(product);
      }
     
    });

  }
  else {
    body = products;
  }

  // products.forEach((product) => {
  //   body.push(product);
  // });

  res.send(body);
});


app.patch('/products', (req,res)=>{
  const productList = req.body.products;
  const rawData = fs.readFileSync('./data/products.json', 'utf-8');
  let products = JSON.parse(rawData);

  for(const cartProduct  of productList){
   const {title, quantity} = cartProduct;
   const productToUpdate = products.find((product)=>product.title === title);
   if(productToUpdate){
    productToUpdate.inventory -= quantity;
   }
  }
  fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
})

app.listen(3000, () => {
  console.log("Listening on port 3000 ...");
});
