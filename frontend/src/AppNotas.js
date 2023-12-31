import React, { Fragment, useEffect, useState } from 'react';
import NavbarNotas from "./ComponetsAdmin/notas/navNotas";
import Notasbody from "./ComponetsAdmin/notas/notasbody";
import { useParams } from "react-router-dom";

const AppNotes = ({ setMessageApi }) => {
  const {uuidClient}= useParams();
  //Clientes
  const [insertNote, setInsertNote] = useState({
    title: '',
    note: '',
  });

  const [notes, setNotes] = useState([]);
  const [listupdateNote, setListupdateNote] = useState(false);
  //Actualizar
  const [noteValues, setNoteValues] = useState({});

  useEffect(() => {
    const getNotes = () => {
      fetch(`http://localhost:3001/notes/${uuidClient}`)
        .then(res => res.json())
        .then(res => setNotes(res.data));
    }
    getNotes();
    setListupdateNote(false);
  }, [uuidClient,listupdateNote]);

  return (
    <Fragment>
      <NavbarNotas brand="Notas" insertNote={insertNote} setInsertNote={setInsertNote}></NavbarNotas>
      <Notasbody notes={notes} setListupdateNote={setListupdateNote} noteValues={noteValues} setNoteValues={setNoteValues} setMessageApi={setMessageApi}></Notasbody>
    </Fragment>
  );
};

export default AppNotes;

