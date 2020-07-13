const express = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../../models/user')


router.post('/',(req, res)=>{
    const {name,
            email,
            password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({msg:'Please enter all feilds'})
    }
    // check for existing user
    User.findOne({email}).then(user=>{
        if (user) return res.status(400).json({msg:"Email already taken"})
        const newUser = new User({
            name,
            email,
            password
        })
        // create salt and hash
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if(err) throw err 
                newUser.password = hash
                newUser.save().then(user=>{

                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),
                        { expiresIn:1800 },
                        (err, token)=>{
                            if(err) throw err
                            res.json({
                                token,
                                user:{
                                    id:user.id,
                                    name:user.name,
                                    email: user.email
                                }
                            })
                        }
                    )

                })

            })
        })
    })
})
 

module.exports=router