const mongoose = require('mongoose')
const PaymentAddress = require('../Schema/PaymentAddress')

//Accepting: {paymentAddress: paymentAddress}
module.exports= function AdminChangePaymentAddress(req, res){


    if(req.body.paymentAddress === ''){
        res.status(202).json({message: 'Incomplete Data!'})
    }else if(req.body.paymentAddress !== ''){
        PaymentAddress.findOneAndUpdate({title: 'PaymentAddress'}, {paymentAddress: req.body.paymentAddress})
        
        .then(()=>res.status(200).json({message: 'Payment Address Is Changed!'}) )
        .catch(error=>{
            console.log(erorr);
            res.status(202).json({message: 'Erorr!'})
        })
    }

}