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
    },

    getUser:(UserId)=>{
        return new Promise((resolove,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(UserId)}).then((user)=>{
                resolove(user)
            })
        })
    },

    updateUser:(userId,userDetails)=>{
        return new Promise((resolove,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userId)},{
                $set:{
                    fname:userDetails.fname,
                    lname:userDetails.lname,
                    number:userDetails.number,
                    mail:userDetails.mail

                }
            }).then((response)=>{
                resolove()
            })
        })
    },

    disableUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userId)},{
                $set:{
                    isEnabled: false
                }
            }).then(()=>{
                resolve(true)
            })
        })
    },
    
    enableUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userId)},{
                $set:{
                    isEnabled: true
                }
            }).then(()=>{
                resolve(true)
            })
        })
    }



}
