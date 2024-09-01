import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

    const deleteNoteClick =(id)=>{
        deleteNote(id);
    }
    
    const editNoteClick =(note)=>{
        updateNote(note);
    }

    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-2 text-danger" onClick={() => deleteNoteClick(note._id)}></i> {/*delete*/}
                    <i className="fa-regular fa-pen-to-square mx-2 text-success" onClick={(()=>{editNoteClick(note)})}></i> {/*edit*/}
                </div>
            </div>
        </div>
    )
}

export default Noteitem