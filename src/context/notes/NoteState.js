import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
    const notes = []
    const [initialnotes,setNotes]= useState(notes)


    const getallnote = async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {  //(fetch url using header)
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json)
      setNotes(json)
    }

    const addNote = async(title,description,tag) =>{
      const response = await fetch(`${host}/api/notes/newnote`, {
         method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
        });
        const note = await response.json();
        setNotes(initialnotes.concat(note))
      }
      const editnote= async(_id,title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${_id} `, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}),
        });
        const json = response.json();

        let newNoteup = JSON.parse(JSON.stringify(initialnotes))
        for(let index=0;index < newNoteup.length;index++ )
        {
          
        const element = newNoteup[index]; 
          if(element._id === _id) //checking all the notes
          {
            newNoteup[index].title = title;
            newNoteup[index].description = description;
            newNoteup[index].tag = tag;
            break;
          }
        }
        setNotes(newNoteup)
      }
      
      const deletenote = async(_id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${_id} `, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const json = response.json();
        console.log(json)
        console.log("Deleting note:"+_id)
        const newNote = initialnotes.filter(((notes)=>{return notes._id!==_id}))
        setNotes(newNote) 
      }
    return(
        <NoteContext.Provider value={{initialnotes,addNote,deletenote,getallnote,editnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;