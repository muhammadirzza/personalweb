const {ObjectID, MongoClient} = require('mongodb')  //mongoclient seperti fungsi db pada mysql
const url = `mongodb+srv://muh_irzza:09091993@cluster0-lapel.mongodb.net/test?retryWrites=true&w=majority`
// const url = `mongodb://localhost:27017`


module.exports={
    ObjectID,
    MongoClient,
    url
}