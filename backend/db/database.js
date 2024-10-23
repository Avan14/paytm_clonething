import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/paytmDB');

 const transactionschema = mongoose.Schema({
    sender:String,
    reciever:String,
    amount : Number,
    transaction:String
})

 const userschema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minlen:3,
        maxlen:30
    },
    balance:Number,
    transactions:[transactionschema]
})

export const Transaction = mongoose.model('Transaction',transactionschema)
export const User = mongoose.model('User',userschema)

