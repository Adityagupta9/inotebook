import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';
import Newnote from './Newnote';
import { useNavigate  } from 'react-router-dom'
import '../style/notes.css';

const Notes = ({setProgress}) => {
  let navigate = useNavigate ();
  const context = useContext(NoteContext);
  const { initialnotes, getallnote,editnote} = context;

  useEffect(() => {
      if(localStorage.getItem('token'))
      {
        getallnote();
      }
      else{
      navigate("/login")
    }
  },[getallnote, navigate]);

  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  const updatenote = (currentnote) => {
    setProgress(10)
    setNote({id:currentnote._id ,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Close the modal and reset the note state
    editnote(note.id,note.etitle,note.edescription,note.etag)
    setShowModal(false);
    setProgress(100)
    
  };

  const handelClick = (e) => {
    console.log("Updating the note..",note)
    e.preventDefault();
    handleCloseModal();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showModal && (
        <div className="mymodal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className='enewnote'>
              <label htmlFor="title">Title</label>
              <input className="enotes"type="text" id='etitle' name='etitle' onChange={onChange} value={note.etitle} />

              <label htmlFor="description">Description</label>
              <input className="enotes"type="text" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />

              <label htmlFor="tag">Tags</label>
              <input className="enotes"type="text" id="etag" name="etag" onChange={onChange} value={note.etag} />

              <button type='submit' className='ebut' onClick={handelClick}>Update</button>
            </div>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
        </div>
      )}
      <div className="container">
        {initialnotes.map((notes) => {
          return (
            <Notesitem key={notes._id} updatenote={updatenote} initialnotes={notes} />
          );
        })}
      </div>
      <div className='newnote-main'>
        <Newnote />
      </div>
    </div>
  );
};

export default Notes;
