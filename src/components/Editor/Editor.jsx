import React from 'react';
import './editor.scss';

const Editor = ({activeNote, onEdit, menuActive}) => {

    const onEditNote = (item, value) => {
        onEdit({
            ...activeNote,
            [item]: value,
            time: Date.now()
        })
    }

    if(!activeNote) {
        return (
            <div className={menuActive ? "editor editor_empty" : "editor editor_empty editor_full"}>
                <div className="no__note">
                    Select or create a note
                </div>
            </div>
        )
    }

    return (
        <div className={menuActive ? "editor" : "editor editor_full"}>
            <input 
                className="editor__title" 
                type="text" 
                placeholder="Title" 
                maxLength="32"
                value={activeNote.title} 
                onChange={(e) => onEditNote('title', e.target.value)}/>
            
            <textarea 
                className="editor__area" 
                name="text" 
                placeholder="Type something..." 
                id="text"
                value={activeNote.body}
                onChange={(e) => onEditNote('body', e.target.value)}
                ></textarea>
        </div>
    );
};

export default Editor;