import React, { useEffect, useState, useContext, useCallback } from 'react';
import uuid from 'react-uuid';
import Editor from '../../components/Editor/Editor';
import NoteList from '../../components/NoteList/NoteList';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


const AppPage = () => {

    const [notes, setNotes] = useState(
        [
            {
                id: uuid(),
                title: 'Welcome to Textnote',
                body: `Text note is a simple online application for creating notes and storing various texts. The application is available in the browser for any device. A cloud database is used to store information, so all your notes will be available on all your devices. The application has an intuitively simple interface.

Text note is an absolutely free and open source application. 
The application repository on Github is available at the link:
https://github.com/cheatsnake/Textnote
                `,
                time: Date.now()
            }
        ]
    );

    const {userId} = useContext(AuthContext);
    const [active, setActive] = useState(false);
    const [menuActive, setMenuActive] = useState(true);
    const [notesId, setNotesId] = useState(null)

    const addNote = () => {
        const newNote = {
            id: uuid(),
            title: 'Untitled',
            body: '',
            time: Date.now()
        }

        setNotes([newNote, ...notes]);
        setActive(newNote.id);
    }

    const createNote = useCallback(async () => {
        try {
            await axios.post('https://txtnote.herokuapp.com/api/note/add', {notes, userId}, {
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                setNotesId(response.data._id);
            })
        } catch(e) {
            console.log(e);
        }
    }, [notes, userId]);

    const getNotes = useCallback(async () => {
        try {
            await axios.get('https://txtnote.herokuapp.com/api/note', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then((response) => {
                if (response.data.length) {
                    // console.log('data OK');
                    setNotes(response.data[0].notes);
                    setNotesId(response.data[0]._id);
                } else if (userId) {
                    // console.log('CREATE NEW USER DATA');
                    createNote();
                } else {
                    // console.log('NOT FOUND');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [createNote, userId])

    const updateNotes = useCallback(async (id) => {
        try {
            await axios.put(`https://txtnote.herokuapp.com/api/note/update/${id}`, {notes}, {
                headers: {'Content-Type': 'application/json'}
            })
        } catch (error) {
            console.log(error);
        }
    }, [notes]);

    useEffect(() => {
        // console.log('Hello');
        getNotes();
    }, [userId]);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
        if (notesId) {
            updateNotes(notesId);
        }
    }, [notes, updateNotes, notesId]);

    const delNote = (id) => {
        let isBoss = window.confirm("Do you really want to delete this note?");
        
        if (!isBoss) {
            return null;
        }
        setNotes(notes.filter((note) => note.id !== id));
    }

    const onEdit = (editedNote) => {
        const editedNotes = notes.map((note) => {
            if (note.id === active) {
                return editedNote;
            }
            return note;
        });
        setNotes(editedNotes);
    }

    const activeNote = () => {
        return notes.find((note) => note.id === active);
    }

    const toggleMenuActive = () => {
        let x = menuActive
        setMenuActive(!x)
    }
    
    return (
        <>
            <NoteList 
                notes={notes} 
                addNote={addNote} 
                delNote={delNote}
                active={active}
                setActive={setActive}
                menuActive={menuActive}
                setMenuActive={toggleMenuActive}
            />
            <Editor
                activeNote={activeNote()}
                onEdit={onEdit}
                menuActive={menuActive}
            />
        </>
    );
};

export default AppPage;