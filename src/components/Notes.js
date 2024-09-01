import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id:"", e_title:"", e_description:"", e_tag:""});
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes();
        }else{
            navigate("/login");
        }
    }, [navigate, getNotes]);

    const openRef = useRef(null);
    const refClose = useRef(null);
    const updateNote = (editedNoteData) => {
        openRef.current.click();
        setNote({id:editedNoteData._id, e_title:editedNoteData.title, e_description:editedNoteData.description, e_tag:editedNoteData.tag});
    }
    
    const editNoteClick =(e)=>{
        e.preventDefault();
        editNote(note.id, note.e_title, note.e_description, note.e_tag);
        refClose.current.click();
    }
    const onChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Addnote />
            <button type="button" ref={openRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="e_title" name="e_title" aria-describedby="emailHelp" placeholder="Add your title" value={note.e_title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="e_description" name="e_description" placeholder="Add your description" value={note.e_description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="e_tag" name="e_tag" placeholder="Add your tag" value={note.e_tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={editNoteClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5 mb-3">
                <div className="row">
                    <h2>View Your Notes</h2>
                    {notes.length === 0 && <p className='m-1'>You haven't entered any notes yet. Please add your notes above.</p>}
                    {notes.map((element) => {
                        return <Noteitem key={element._id} note={element} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes