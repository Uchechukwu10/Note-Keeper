import { React, useState, useContext } from 'react';
import { NoteContext } from '../Contexts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNote = (props) => {
  const notifyError = (message) => toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const { newNote, setNewNote, editing, setEditing } = useContext(NoteContext);
  const [category, setCategory] = useState('personal');

  const handleChange = (event) => {
    const {name, value} = event.target;

    setNewNote((prevValue) => {
      return {...prevValue, [name]: value}
    })
  }

  function submitNote(e) {
    e.preventDefault();
    newNote.title==="" || newNote.content==="" ? notifyError('Title or content field cannot be  empty') : props.addNote(); 
  }

  return (
    <div className={editing ? 'create-note blurred' : 'create-note'}>
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
        <div className='create-note'>
            <form className='create-form w-10/12 lg:w-5/12 relative' onSubmit={submitNote}>
                <input name="title" placeholder="Title" value={newNote.title} className='w-full border-none p-1 text-xl' onChange={handleChange}/>
                <textarea name="content" placeholder="Take a note..." value={newNote.content} rows="3" className='hidden lg:flex w-full border-none p-1 text-md' onChange={handleChange}/>
                <textarea name="content" placeholder="Take a note..." value={newNote.content} rows="2" className='flex lg:hidden w-full border-none p-1 text-md' onChange={handleChange}/>
                <select
                    id="add-select-category"
                    className='add-category-select'
                    name='category'
                    onChange={handleChange}
                    value={newNote.category}
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="school">School</option>
                  </select>
                <button className='w-16 h-16 absolute' type='submit'>Add</button>
            </form>
        </div>
    </div>
  )
}

export default CreateNote