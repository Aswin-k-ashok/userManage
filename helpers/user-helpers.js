var db = require('../config/connection')
var collection = require('../config/collections');
const async = require('hbs/lib/async');

module.exports = {

    addUser:(user,callback)=>{
        console.log(user);

        db.get().collection('user').insertOne(user).then((data)=>{
            callback(data) 
            console.log(data)
            
        })
    },

    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let user =await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(user)
        })
    }


}