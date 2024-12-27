const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1:Get all the user notes using:Get "/api/notes/fetchallnotes".Doesn't require login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }

});

//ROUTE2 :Add a new notes using:post "/api/notes/addnotes".Doesn't require login
router.post(
    "/addnotes",
    fetchuser,
    [
        body("title", "Enter a vaild title").isLength({ min: 3 }),
        body("description", "Password must be atleast 5 description").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if there are errors return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id,
            });

            const savedNote = await note.save()
            res.json(note);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some Error Occured");
        }

    }
);

//ROUTE3 :Update an existing  notes using:post "/api/notes/updatenote".Doesn't require login
router.put("/updatenote/:id",fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body
    try{
    // create a newNote
    const newNote = {};
    if(title){newNote.title =title }
    if(description){newNote.description =description }
    if(tag){newNote.tag =tag }

    // Find the note to be updated and update
    let note = await Note.findByIdAndUpdate(req.params.id)
    if(!note){
       return res.status(404).send("Not Found");
    }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
    res.json({note})
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})

//ROUTE 4 :Delete an existing  notes using: DELETE "/api/notes/deletenote".Doesn't require login
router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
   try {
    
  
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id)
    if(!note){
       return res.status(404).send("Not Found");
    }
//Allow deletion if the user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note})
}catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occured");
}
})

module.exports = router;
