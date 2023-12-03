const mongoose=require('mongoose');

const Usershema=new mongoose.Schema({
    name: String,
    email:String,
    password:String,
});
 
const UserModel=mongoose.model('users',Usershema);
module.exports=UserModel;