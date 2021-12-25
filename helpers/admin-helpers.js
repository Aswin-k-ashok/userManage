var db = require('../config/connection')
var collection = require('../config/collections');
const async = require('hbs/lib/async');
const bcrypt = require('bcrypt');
const { response } = require('express');
const { ObjectId } = require('mongodb');

module.exports={

    deleteUser:(UserId)=>{
        console.log(UserId)
        return new Promise ((resolove,reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:ObjectId(UserId)}).then(()=>{
                resolove(true)
            })
        })
    }



}
