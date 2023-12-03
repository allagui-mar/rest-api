require('dotenv').config();
const express= require('express');
const mongoose=require('mongoose');
const app=express();
const UserModel=require('./models/Users')

app.use(express.json());
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log("connected to data base");
});

app.get('/getUsers',async(req,res)=>{
    const users=await UserModel.find();
    req.send(users)
})
// POST: ADD A NEW USER TO THE DATABASE
app.post('/createUsers', async (req, res) => {
    const user = new UserModel(req.body);
    await user.save();
    res.send(user);
   });
   
// PUT: EDIT A USER BY ID
app.put('/users/:id', async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
   });
   // DELETE: REMOVE A USER BY ID
app.delete('/users/:id', async (req, res) => {
   const user= await UserModel.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
   });
   
   app.listen(3000,()=>{
    console.log("server is running in port 3000");
});