const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body,validationResult } = require('express-validator');

// Route 1: Get all the the notes using GET "/api/notes/getuser"

router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
        res.send(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
    
})


// Route 2: Get a New Node using post GET "/api/notes/newnote"

router.post('/newnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Enter a valid description').isLength({min:3})
], async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
    const errors = validationResult(req);
    if(!errors){
        return res.status(400).json({error:errors.array()});
    }
    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    const savenote = await note.save()
    res.json(savenote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
    
})
module.exports = router

// Router 3: Update the existing note put "/api/notes/updatenote" Login Required

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
    // Create new note object
    const newNote = {};
    if(title){newNote.title=title;}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    //Find the node which is to be deleted
    let notes = await Notes.findById(req.params.id);
    if(!notes){
        return res.status(404).send("Not found")
    }

    // Check if the correct user
    if(notes.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    notes = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
    res.json({notes});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
    

})

// Router : Delete the existing note DELETE "/api/notes/deletenote" Login Required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
    //Find the node which is to be deleted
    let notes = await Notes.findById(req.params.id);
    if(!notes){
        return res.status(404).send("Not found")
    }

    // Check if the correct user
    if(notes.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    notes = await Notes.findByIdAndDelete(req.params.id)
    res.json({Sucesses:"Note deleted sucessfully",note:notes});
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
}
})