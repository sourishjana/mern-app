const express = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/user')


// /api/auth routes
router.post('/',(req, res)=>{
    const {email,
            password} = req.body
    if(!email || !password){
        return res.status(400).json({msg:'Please enter all feilds'})
    }
    // check for existing user
    User.findOne({email}).then(user=>{
        if (!user) return res.status(400).json({msg:"User dosent exists"})
        
        // validate password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({msg:"Invalid credentials"})
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
 
router.get('/user', auth, (req,res)=>{
    User.findById(req.user.id).select('-password').then(user => res.json(user))
}) 

module.exports=router