import React, { useContext } from 'react';
import '../style/notesitem.css';
import NoteContext from '../context/notes/noteContext';

const Notesitem = ({ initialnotes,updatenote}) => {
  const context = useContext(NoteContext);
  const { deletenote } = context;

  return (
    <div>
      <div className="card">
        <i class="fa-solid fa-tag fa-flip-vertical toptag"></i>
        <div className='newstitle'>{initialnotes.title}</div>
        <div className='newsdesc'>{initialnotes.description}</div>
        <div className='newstag'>#  {initialnotes.tag}</div>
        <div className='newsdate'>{new Date(initialnotes.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
        <i className="fas fa-trash" onClick={() => {deletenote(initialnotes._id) }}></i>
        <i className="fas fa-pen" onClick={()=>{updatenote(initialnotes)}}></i>
      </div>
    </div>
  );
}

export default Notesitem;
