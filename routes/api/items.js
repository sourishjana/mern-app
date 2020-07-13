const express = require('express')
const router = express.Router()
const auth= require('../../middleware/auth')

const Item = require('../../models/item')

// /api/items route

router.get('/',async(req, res)=>{
    Item.find().sort({date:-1}).then(items => res.json(items))
})

router.post('/',auth,(req, res)=>{
    
    const newItem = new Item({
        name:req.body.name
    })
    newItem.save().then(item => res.json(item))
})

router.delete('/:id',auth,(req, res)=>{
    Item.findById(req.params.id).then( item => item.remove().then(()=> res.json({success:true})) )
    .catch(err => res.status(404).json({success:false})) 
})

router.post('/update/:id',auth,(req,res)=>{
    const updates=Object.keys(req.body)
    const updatedParts = req.body
    
    Item.findById(req.params.id).then(item =>{
        if(!item){
            return res.json({success: 'not updated'})
        }else{
            updates.forEach((key)=>{item[key]=req.body[key]})
            item.save()
            res.send(updatedParts)
        }
    } ) 
})

module.exports=router