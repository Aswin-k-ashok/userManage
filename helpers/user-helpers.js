var db = require('../config/connection')
var collection = require('../config/collections');
const async = require('hbs/lib/async');
const bcrypt = require('bcrypt');
const { response } = require('express');

module.exports = {

    // addUser:(user,callback)=>{
        
    //     user.password = bcrypt.hash(user.password,10)
    //     db.get().collection('user').insertOne(user).then((data)=>{
    //         callback(data) 
    //         console.log(data)
            
    //     })
    // },

  doSignup:(userData)=>{
      return new Promise(async(resolve,reject)=>{
        userData.isEnabled =true
          userData.password = await bcrypt.hash(userData.password,10)
          console.log(userData);
          db.get().collection(collection.USER_COLLECTION).insertOne(userData)
          resolve(signed = true)
      })
  },

  doLogin:(userData)=>{
    return new Promise(async(resolve,reject)=>{
        let loginStatus = false
        let response = {}
        let user = await db.get().collection(collection.USER_COLLECTION).findOne({mail:userData.mail,isEnabled:true})
        if(user){
            bcrypt.compare(userData.password,user.password).then((status)=>{
                if(status){
                    console.log("login sucess")
                    response.status = true 
                    response.user = user
                    resolve(response)
                }else{
                    console.log(("wrong password, login failed"));

                    response.status = false
                    resolve({status:false})
                    
                }
            })
        }
        else{
            console.log("incorrect username , login failed")
            
            resolve({status:false})
        }
    })
  },



    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let user =await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(user)
        })
    }


}