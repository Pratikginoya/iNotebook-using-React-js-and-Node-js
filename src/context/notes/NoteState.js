import React, { useContext, useState } from "react";
import NoteContext from "./noteContext";
import alertContext from "../alert/alertContext";

const NoteState = (props) => {
    // const state1 = {
    //     "name":"Pratik",
    //     "std":"4b"
    // }
    // const [state, setState] = useState(state1);
    // const update = ()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name":"Hello",
    //             "std":"1b"
    //         })
    //     }, 1000);
    // }
    const { showAlert } = useContext(alertContext);
    const host = process.env.REACT_APP_API_HOST;
    const notesInitial = [];

    // get all notes
    const getNotes = async () => {
        const request = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            // body: JSON.stringify({ username: "example1" }),
        });

        const response = await request.json();
        if(response.success == true){
            setNotes(response.data);
        } else {
            // alert(response.data);
            showAlert("danger","Error: "+response.data);
        }
    }

    // add note
    const addNote = async (title, description, tag) => {
        const request = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const response = await request.json();
        if(response.success == true){
            setNotes(notes.concat(response.data));
            showAlert("success","Your note has been added successfully");
        } else {
            // alert(response.data);
            showAlert("danger","Error: "+response.data);
        }
    }

    // delete note
    const deleteNote = async (id) => {
        const request = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });

        const response = await request.json();
        if(response.success == true){
            const newNotes = notes.filter((element) => { return element._id !== id });
            setNotes(newNotes);
            showAlert("success","Your note has been deleted successfully");
        } else {
            showAlert("danger","Error: "+response.data);
        }
    }

    // edit note
    const editNote = async (id, title, description, tag) => {
        const request = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const response = await request.json();
        if(response.success == true){

            let newNotes = JSON.parse(JSON.stringify(notes)); // Create a deep copy of notes
            for (let i = 0; i < newNotes.length; i++) {
                if (newNotes[i]._id == id) { // Find the note with the matching _id
                    newNotes[i].title = title; // Update the title
                    newNotes[i].description = description; // Update the description
                    newNotes[i].tag = tag; // Update the tag
                    break; // Exit the loop once the note is found and updated
                }
            }
            setNotes(newNotes); // Update the state with the new array

            // (OR another way)

            // const newDataOfNotes = notes.map(e => {
            //     if (e._id === id) {
            //         return { ...e, title: title, description: description, tag: tag }; // Return a new object with updated properties
            //     }
            //     return e; // Return the original object if it doesn't match
            // });
            // setNotes(newDataOfNotes);

            showAlert("success","Your note has been edited successfully");
        } else {
            showAlert("danger","Error: "+response.data);
        }
    }

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;