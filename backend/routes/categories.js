const {Category} = require('../models/category')
const express = require('express')
const router = express.Router();

// get all categories 
router.get('/',async(req , res)=>{
    const categoriesList = await Category.find();

    if(!categoriesList){
        return res.status(500).json({success:false});
    }

    res.status(201).send(categoriesList);
})

// get category by id 
router.get('/:id',async(req , res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(500).json({message : "The Category with given ID was not found."})
    }
    res.status(200).send(category)
})

// post new category 
router.post('/' , async(req , res)=>{
    let category = new Category({
        name : req.body.name,
        icon : req.body.icon,
        color : req.body.color
    })
    category = await category.save();

    if(!category){
        return res.status(404).send("the category not be created!")
    }

    res.send(category)
})

// delete category 
router.delete('/:id',(req,res)=>{
    Category.findByIdAndDelete(req.params.id).then(category => {
        if(category){
            return res.status(200).json({success:true , message:'the category is deleted'})
        }else{
            return res.status(404).json({success:false , message:"category not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error : err})
    })
})

module.exports = router ;