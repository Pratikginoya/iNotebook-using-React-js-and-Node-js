const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1:fetch all notes of user using, GET: "/api/notes/fetchallnotes", Login require
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    let success=false;
    try{
        const data = await Notes.find({user: req.user.id});
        success=true;
        res.json({success, data});
    }catch(error){
        success = false;
        console.error(error.message);
        res.status(500).send({success, "data":"Internal Server Error!"});
    }
});

// ROUTE 2:add new note of user using, POST: "/api/notes/addnote", Login require
router.post('/addnote', fetchuser, [
    body('title', 'Title must be alteast 5 character').isLength({min:5}),
    body('description', 'Title must be alteast 5 character').isLength({min:5})
], async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ success, data: errorMessages });
    }

    const {title, description, tag} = req.body;
    try{
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const data = await note.save();
        success=true;
        res.json({success, data});
    }catch(error){
        success = false;
        console.error(error.message);
        res.status(500).send({success, "data":"Internal Server Error!"});
    }
});

// ROUTE 3:update note using, PUT: "/api/notes/updatenote/:id", Login require
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Title must be alteast 5 character').isLength({min:5}),
    body('description', 'Title must be alteast 5 character').isLength({min:5})
], async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ success, data: errorMessages });
    }

    const {title, description, tag} = req.body;
    try{
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send({success, "data":"Note not found!"});
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send({success, "data":"Unauthorized user"});
        }

        const data = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        success=true;
        res.send({success, data});
    }catch(error){
        success = false;
        console.error(error.message);
        res.status(500).send({success, "data":"Internal Server Error!"});
    }
})

// ROUTE 4:delete note using, DELETE: "/api/notes/deletenote/:id", Login require
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    let success=false;
    try{
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send({success, "data":"Note not found!"});
        }
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send({success, "data":"Unauthorized user"});
        }

        const data = await Notes.findByIdAndDelete(req.params.id);
        success = true;
        res.json({success, "data":"Note has been deleted"});
    }catch(error){
        success = false;
        console.error(error.message);
        res.status(500).send({success, "data":"Internal Server Error!"});
    }
});

module.exports = router