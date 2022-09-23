import "./App.css";
import { useState, useEffect, useContext } from "react";
import NavBar from "./components/NavBar";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
import { myNotes } from "./mynotes";
import { db } from "./firebase-config";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { NoteContext } from "./Contexts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
  });
  const notifySuccess = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
  });
  const [added, setAdded] = useState({});
  const [notes, setNotes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    pinned: false,
    category: 'personal'
  });
  const [editing, setEditing] = useState(false);
  const [activeNote, setActiveNote] = useState({});
  const [allNotes, setAllNotes] = useState([]);

  const notesCollectionRef = collection(db, "notes");

  const addNote = async () => {
    try {
      console.log("Adding a new note");
      await addDoc(notesCollectionRef, newNote);
      setAdded(newNote);
      notifySuccess('Note added successfully');
      setNewNote({
        title: "",
        content: "",
        pinned: false,
        category: 'personal'
      });
    }
    catch(err) {
      console.log(err.message);
      notifyError('Unable to create note');
    }
  };

  const deleteNote = async (id) => {
    try {
      const noteDoc = doc(db, "notes", id);
      await deleteDoc(noteDoc);
      setAdded({note: id});
      notifySuccess('Note deleted successfully');
    }
    catch(err) {
      console.log(err.message);
      notifyError('Unable to delete note');
    }
  };

  const updateNote = async (id) => {
    try {
      const newFields = {title: activeNote.title, content: activeNote.content};
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, newFields);
      setAdded(newFields);
      notifySuccess('Note updated successfully');
    }
    catch(err) {
      console.log(err.message);
      notifyError('Unable to update note');
    }
  }

  const updatePin = async (pin, id) => {
    const newFields = {pinned: pin};
    const userDoc = doc(db, "notes", id);
    await updateDoc(userDoc, newFields);
    setAdded(newFields);
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(notesCollectionRef);
        setAllNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      catch(err) {
        console.log(err.message);
        notifyError('Unable to load notes');
      }     
    };
    getUsers();
  }, [added]);

  useEffect(() => {
    setTotalPages(Math.ceil(allNotes.length/6));
    const pinnedNotes = [];
    const otherNotes = [];
    allNotes.map((note) => {
      note.pinned ? pinnedNotes.push(note) : otherNotes.push(note);
    })
    setNotes([...pinnedNotes, ...otherNotes]);
  }, [allNotes]);

  return (
    <div className="App relative">
      <NavBar />
      <NoteContext.Provider value={{ notes, setNotes, newNote, setNewNote, editing, setEditing, activeNote, setActiveNote, totalPages, setTotalPages }}>
        <ToastContainer
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
          />
        <CreateNote addNote={addNote}/>
        <Notes notes={notes} updateNote={updateNote} updatePin={updatePin} deleteNote={deleteNote}/>
      </NoteContext.Provider>
    </div>
  );
}

export default App;
