import React, { useContext } from 'react';
import { NoteContext } from '../Contexts';

const EditNote = (props) => {
    const {editing, setEditing, activeNote, setActiveNote} = useContext(NoteContext);

    const handleChange = (event) => {
        const {name, value} = event.target;
    
        setActiveNote((prevValue) => {
          return {...prevValue, [name]: value}
        })
      }

    const cancelEditing = (event) => {
        event.preventDefault();
        setEditing(false);
        setActiveNote({});
    }
  return (
        <div className='note-editor fixed z-10'>
            <form className='w-full py-8 px-8 bg-white'>
                <input name="title" placeholder="Title" className='w-full border-none p-5 text-3xl' value={activeNote.title} onChange={handleChange}/>
                <textarea name="content" placeholder="Take a note..." rows="9" className='w-full border-none p-5 text-xl' value={activeNote.content} onChange={handleChange}/>
                <div className='flex justify-between'>
                    <div className='flex items-center justify-center w-16 h-16 left-btn bg-red-500' onClick={cancelEditing}>Cancel</div>
                    <div className='flex items-center justify-center w-16 h-16 right-btn' onClick={() => props.handleUpdate()}>Finish</div>
                </div>
            </form>
        </div>
  )
}

export default EditNote