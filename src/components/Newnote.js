import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import '../style/newnote.css';

const Newnote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"",description:"",tag:""})
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const isSubmitDisabled = note.title === "" || note.description === "" || note.tag === "";

  return (
    <div>
      <div className='newnote'>
        <h2><span><i className="fa-solid fa-newspaper"></i>  </span> Add New Note</h2>
        <label htmlFor="title">Title</label>
        <input type="text" id='title' name='title' onChange={onChange} value={note.title} autocomplete="off"/>

        <label htmlFor="desc">Description</label>
        <input type="text" id="description" name="description" onChange={onChange} value={note.description} autocomplete="off"/>

        <label htmlFor="tag">Tags</label>
        <input type="text" id="tag" name="tag" onChange={onChange} value={note.tag} autocomplete="off"/>

        <button type='submit' onClick={handleClick} disabled={isSubmitDisabled}>Add Note</button>
      </div>
      {isSubmitDisabled}
    </div>
  );
};

export default Newnote;
