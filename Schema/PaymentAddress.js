const mongoose = require('mongoose')


const paymentAddress = new mongoose.Schema({

    title: String,
    paymentAddress: String
})

const PaymentAddress = mongoose.model('PaymentAddress', paymentAddress);

module.exports=PaymentAddress;