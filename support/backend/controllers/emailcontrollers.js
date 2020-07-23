const {mongodb} = require('../connections')
const {MongoClient, ObjectID, url} = mongodb
const database='inbox'
const collection='email_inbox'
const transporter = require('../support/mailer')

MongoClient.connect(url, {useUnifiedTopology:true}, (err,client)=>{        //cek koneksi
    if(err) console.log(err)
    console.log('terhubung ke mongodb')
    client.close()
})

module.exports={
    addemails:(req,res)=>{
        console.log(req.body)
        MongoClient.connect(url, {useUnifiedTopology:true}, (err,client)=>{
            var emails=client.db(database).collection(collection)
            emails.insertOne(req.body.data, (err1,result1)=>{      //insertMany bisa input satu data ataupun banyak data
                client.close()                                      //saat insert akan mendapatkan objectID seperti insertId pada mysql
                if(err1) res.status.send(err1)
                transporter.sendMail({
                    from:'portfolio <irzza.pwdk@gmail.com>',
                    to:'muhammadirzza@gmail.com',
                    subject:'Web Portfolio',
                    html:`Coba cek, ada pesan masuk`
                },(erremail, resemail)=>{
                    if(erremail) return res.status(500).send(erremail)
                    res.status(200).send(result1)
                })
            })
        })
    },

}