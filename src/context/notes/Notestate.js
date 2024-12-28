import NoteContext from "./noteContext";
import { useState } from "react";

const Notestate = (props) => {
  const host = "https://inotebook-3-6ooa.onrender.com"
  const notesInitial =[]

  const [notes, setNotes] = useState(notesInitial);

  //Fetch  Note
const getNotes = async()=>{
  //API Call
const response = await fetch(`${host}/api/notes/fetchallnotes`,{
  method:'GET',
  headers:{
    'Content-Type':'application/json',
    'auth-token':localStorage.getItem('token')
 },
})
  const json = await response.json();
  setNotes(json)
}
  //Add Note
const addNote=async(title,description,tag)=>{
  //API Call
const response = await fetch(`${host}/api/notes/addnotes`,{
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    'auth-token':localStorage.getItem('token')
 },
  body:JSON.stringify({title,description,tag})
})
const note =  response.json()
setNotes(notes.concat(note))

}

  //Delete Note
const deleteNote=async(id)=>{
  //API Key
  const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token')
   },
  })
  const json =  response.json()
  console.log(json)
  const newNote = notes.filter((note)=>{return note._id!==id})
  setNotes(newNote)

}


  //Edit Note

  const editNote=async(id,title,description,tag)=>{
//API Call
const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
  method:'PUT',
  headers:{
    'Content-Type':'application/json',
    'auth-token':localStorage.getItem('token')
 },
  body:JSON.stringify({title,description,tag})
})
const json = await response.json()
console.log(json)
let newNotes = JSON.parse(JSON.stringify(notes))
//Edit logic on Client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  
  }
  
 
  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default Notestate;
