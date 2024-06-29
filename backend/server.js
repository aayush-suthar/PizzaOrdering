const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors')
const { web_user } = require("./models/user.js")
const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());

let conn;
async function main(){
    conn = await mongoose.connect('mongodb://127.0.0.1:27017/PIZZA-DATABASE');
}
main()


app.post('/login' , async (req,res) => {

  const {name,pass} = req.body;

  let check_exist = await web_user.findOne({Password : pass , Name : name})

  if(!check_exist){
    res.send(false);
  }else{
   res.send(true); 
  }
})


app.post('/signin', async (req,res)=>{
  const {name , pass , address , phone} = req.body;

  let password_check_exist = await web_user.findOne({Password : pass})
  if(!password_check_exist){
    let user = new web_user({Name : name , Password : pass , Address : address , Phone : phone});
    user.save();
    res.send(false);
  }else{
   res.send(true); 
  }
  // console.log(name,typeof name,pass,typeof pass,address,typeof address,phone,typeof phone)


})

app.post('/user_profile', async (req,res)=>{
  const { pass } = req.body;
  let password_check_exist = await web_user.findOne({Password : pass})
  if(!password_check_exist){
    res.send(false);
  }else{
   res.send(password_check_exist); 
  }
})

app.post('/user_order', async (req,res)=>{
  const { pass } = req.body;
  let password_check_exist = await web_user.findOne({Password : pass})
  if(!password_check_exist){
    res.send(false);
  }else{
   res.send(password_check_exist); 
  }
})


app.get('/get_some_Pizza' , async (req,res)=>{
  
  try {
    const data = fs.readFileSync('C:\\Users\\AYUSH\\OneDrive\\Desktop\\pizza\\frontend\\src\\food_data.json');
    // console.log(JSON.parse(data));
    res.json(JSON.parse(data).pizza)
} catch (error) {
    console.error('Error reading file:', error);
    res.send(error)
  }  
})

app.get('/get_some_Combo' , async (req,res)=>{
  
  try {
    const data = fs.readFileSync('C:\\Users\\AYUSH\\OneDrive\\Desktop\\pizza\\frontend\\src\\food_data.json');
    // console.log(JSON.parse(data));
    res.json(JSON.parse(data).Combo)
} catch (error) {
    console.error('Error reading file:', error);
    res.send(error)
  }  
})

app.get('/get_some_Garlic' , async (req,res)=>{
  
  try {
    const data = fs.readFileSync('C:\\Users\\AYUSH\\OneDrive\\Desktop\\pizza\\frontend\\src\\food_data.json');
    // console.log(JSON.parse(data));
    res.json(JSON.parse(data).garlic)
} catch (error) {
    console.error('Error reading file:', error);
    res.send(error)
  }  
})

app.get('/get_some_Beverage' , async (req,res)=>{
  
  try {
    const data = fs.readFileSync('C:\\Users\\AYUSH\\OneDrive\\Desktop\\pizza\\frontend\\src\\food_data.json');
    // console.log(JSON.parse(data));
    res.json(JSON.parse(data).beverage)
} catch (error) {
    console.error('Error reading file:', error);
    res.send(error)
  }  
})

app.get('/get_some_Dessert' , async (req,res)=>{
  
  try {
    const data = fs.readFileSync('C:\\Users\\AYUSH\\OneDrive\\Desktop\\pizza\\frontend\\src\\food_data.json');
    // console.log(JSON.parse(data));
    res.json(JSON.parse(data).dessert)
} catch (error) {
    console.error('Error reading file:', error);
    res.send(error)
  }  
})


app.post('/order_insert',async (req,res)=>{

  const {pass , food_type , food_item} = req.body

  let this_user = await web_user.findOne({Password : pass})
  // this_user = await this_user.json()

  if(food_type == "pizza" || food_type == "combo"){
    this_user.Order.USER_PIZZA.push(food_item)
  }else if(food_type == "beverage"){
    this_user.Order.USER_BEVERAGE.push(food_item)    
  }else if(food_type == "dessert"){
    this_user.Order.USER_DESSERT.push(food_item)
  }else if(food_type == "garlic"){
    this_user.Order.USER_GARLIC.push(food_item)
  }
  await this_user.save()
  res.send(true)

})

app.post('/order_delete',async (req,res)=>{

  const {pass , food_type , food_item} = req.body

  let this_user = await web_user.findOne({Password : pass})

  console.log(pass,food_type,food_item)

  if(food_type === "pizza" || food_type === "combo"){
    for(var i = 0;i < this_user.Order.USER_PIZZA.length ; i++){
      if( JSON.stringify(this_user.Order.USER_PIZZA[i]) === JSON.stringify(food_item) ){
        this_user.Order.USER_PIZZA.splice(i,1)
      }
    }
  }else if(food_type === "garlic"){
    for(var i = 0;i < this_user.Order.USER_GARLIC.length ; i++){
      if( JSON.stringify(this_user.Order.USER_GARLIC[i]) === JSON.stringify(food_item) ){
      this_user.Order.USER_GARLIC.splice(i,1)
    }
  }
  }else if(food_type === "beverage"){
    for(var i = 0;i < this_user.Order.USER_BEVERAGE.length ; i++){
      if( JSON.stringify(this_user.Order.USER_BEVERAGE[i]) === JSON.stringify(food_item) ){
      this_user.Order.USER_BEVERAGE.splice(i,1)
    }
  }
  }else if(food_type === "dessert"){
    for(var i = 0;i < this_user.Order.USER_DESSERT.length ; i++){
      if( JSON.stringify(this_user.Order.USER_DESSERT[i]) === JSON.stringify(food_item) ){
      this_user.Order.USER_DESSERT.splice(i,1)
    }
  }
  }
  await this_user.save();
  return res.send("Done");

  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})