import React, { useContext, useState } from 'react';
import './NoteList.scss';
import './Buttons.scss';
import AddIcon from '../../icons/add.svg';
import DelIcon from '../../icons/delete.svg';
import MenuIcon from '../../icons/menu.svg';
import LogoutIcon from '../../icons/logout.svg';
import { AuthContext } from '../../context/AuthContext';

const NoteList = ({notes, addNote, delNote, active, setActive, menuActive, setMenuActive}) => {

    const sortList = notes.sort((note1, note2) => note2.time - note1.time);
    const [search, setSearch] = useState('');
    const {logout} = useContext(AuthContext);

    function select(id) {
        setActive(id);
        if (window.innerWidth < 768) {
            setMenuActive(false);
        }
    }

    const searchNotes = sortList.filter(note => {
        return note.title.toLowerCase().includes(search.toLocaleLowerCase()) || note.body.toLowerCase().includes(search.toLocaleLowerCase());
    });
    
    return (
        <>
            <button 
                onClick={() => setMenuActive()}
                className="btn btn_menu">
                <img src={MenuIcon} alt="" />
            </button>
            <div className={menuActive ? "note-list" : "note-list note-list_off"}>
                <div className="note-list__header">
                    <div className="note-list__inner">
                        <h2>Textnote</h2>
                    </div>
                    <button 
                        className="btn btn_add"
                        onClick={addNote}
                        >
                            <img src={AddIcon} alt="" />
                        </button>
                </div>
                <div className="note-list__search">
                    <input 
                        type="text" 
                        placeholder="Type to search note" 
                        className="search"
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="note-list__lists">
                    {
                        searchNotes.map((note) => (
                            <div 
                                key={note.id} 
                                className={`note-list__item ${note.id === active && 'active'}`}
                                onClick={() => select(note.id)}>
                                <div className="note-list__item__title">{note.title ? note.title : 'Untitled'}</div>
                                <div className="note-list__item__body">{
                                    note.body.includes(' ') ? note.body.substr(0, 75) + '...' : 'Empty note'
                                }</div>
                                <button 
                                    onClick={() => delNote(note.id)}
                                    className="btn btn_del">
                                        <img src={DelIcon} alt="" />
                                    </button>
                            </div>
                        ))
                    }
                </div>
                <div className="note-list__footer">
                    <button className="btn btn_logout" onClick={logout}>
                        <img src={LogoutIcon} alt="Logout"/>
                    </button>
                    <a href="https://cheatsnake.github.io/" className="label">
                        Made by <b>Yury</b>
                    </a>
                </div>
            </div>
        </>
    );
};

export default NoteList;