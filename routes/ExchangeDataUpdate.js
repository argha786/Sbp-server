const mongoose = require('mongoose')
const ExchangeData = require('../Schema/ExchangeData')

const axios = require('axios')
module.exports = async function ExchangeDataUpdate(req, res) {
    const data = await ExchangeData.findOne({ id: 'btc' })


    let oneBtc;
    axios.get('')
        .then(response => {
            response.data.forEach(element => {

                if (element.code === "USD") {

                    oneBtc = element.rate
                    console.log(element.rate);
                }
            });
        })
        .then(async () => {
            await ExchangeData.findOneAndUpdate(
                { id: 'btc' },
                {

                    'lastOneBtcValue': parseInt(req.body.currentOneBtcValue),
                }
            )

        })
    console.log(data)
    
    res.send(data)

}