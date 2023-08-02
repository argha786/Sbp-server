const mongoose=require('mongoose')
const PaymentAddress=require('../Schema/PaymentAddress')

module.exports =async function AdminGetPaymentAddress(req, res){
    const paymentAddress = await PaymentAddress.findOne({title: 'PaymentAddress'})
    if (!paymentAddress) {
        
        res.status(202).json({message: 'Address Is Not Found!'})
    }else if(paymentAddress){
        res.status(200).json(paymentAddress)
    }else{

        res.status(202).json({message: 'Error!'})
    }
}