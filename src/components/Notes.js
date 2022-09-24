import React, { useContext, useEffect, useState } from 'react';
import { NoteContext } from '../Contexts';
import EditNote from './EditNote';
import { BsPinFill, BsPin } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { AiFillTag } from 'react-icons/ai';
import Pagination from './Pagination';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notes = (props) => {
    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    const [currentPage, setCurrentPage] = useState(1);
    const {editing, setEditing, activeNote, setActiveNote, totalPages, setTotalPages} = useContext(NoteContext);
    const editNote = (note) => {
        setEditing(true);
        setActiveNote(note);
    }
    const removeNote = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <span onClick={onClose}><ImCross fontSize='1.3rem'/></span>
                  <h1 className='font-bold'>Are you sure you want to delete this note?</h1>
                  <p>If you delete this note, you won't be able to recover it</p>
                  <div className='action-btns'>
                  <button className='neutral-btn' onClick={onClose}>No</button>
                  <button className='danger-btn'
                    onClick={() => {
                      props.deleteNote(id);
                      onClose();
                    }}
                  >
                    Yes, Delete it!
                  </button>
                  </div>
                </div>
              );
            }
          });
      };
    const handleUpdate = () => {
        if (activeNote.title==="" || activeNote.content==="") {
            notifyError('Title or content field cannot be  empty');
        } else {
            setEditing(false);
            props.updateNote(activeNote.id);
        }
    }

    const handlePin = (note) => {
        note.pinned ? props.updatePin(false, note.id) : props.updatePin(true, note.id);
    }

    const navigatePage = (direction) => {
        setCurrentPage(direction === 'back' ? currentPage - 1 : currentPage + 1);
    }
    const handleChange = (event, id) => {
      let category = event.target.value;
      props.categoryUpdate(id, category);
      console.log(category);
      console.log(id);
    }
    
   
  return (
    <div className='relative'>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <div className={editing ? '' : 'invisible'}>
            <EditNote handleUpdate={handleUpdate}/>
        </div>
        <div className={editing ? 'notes flex flex-col lg:flex-row flex-wrap blurred w-full mx-4 lg:mx-16' : 'notes flex flex-col lg:flex-row flex-wrap mx-4 lg:mx-16'}>
            { 
                props.notes.slice((currentPage * 6) - 6,currentPage * 6).map((note) => {
                return (
                    <div className='note py-3 px-3 mx-4 my-3 lg:my-8 relative'>
                        <div onClick={() => {editNote(note)}} className='mb-7'>
                            <h1 className='font-bold text-xl lg:text-2xl'>{note.title}</h1>
                            <p className='text-md'>{note.content.substring(0,50) + "..."}</p>
                        </div>
                        <div className='flex justify-between'>
                          <div className='category absolute'>
                            <form>
                              <select
                                id="select-category"
                                className='category-select'
                                onChange={(event) => handleChange(event, note.id)}
                                value={note.category}
                              >
                                <option value="personal">Personal</option>
                                <option value="work">Work</option>
                                <option value="school">School</option>
                              </select>
                            </form>
                          </div>
                          <div title='Delete Note' className='delete-btn w-fit px-2 py-1 my-3 absolute' onClick={() => removeNote(note.id)}><MdDelete fontSize='1.3rem'/></div>
                        </div>
                        <div className='pin-box absolute flex' onClick={() => handlePin(note)}>
                            {note.pinned ? <div className='flex flex-row gap-2 '><em>Pinned</em><span title='Unpin Note'><BsPinFill color="#6faaff" fontSize="1.3em"/></span></div> : <span title='Pin Note'><BsPin color="#6faaff" fontSize="1.3em"/></span>}
                        </div>
                    </div>
                )
            })}
        </div>
        <Pagination currentPage={currentPage} navigatePage={navigatePage} totalPages={totalPages}/>
    </div>
  )
}

export default Notes;