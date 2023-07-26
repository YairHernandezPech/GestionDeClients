import React, { Fragment, useEffect, useState } from 'react';
import NavbarDocuments from "./ComponetsAdmin/documents/navDocuments";
import Documentlist from "./ComponetsAdmin/documents/table";
import { useParams } from "react-router-dom";

const AppDocuments = ({ setMessageApi }) => {
  const [documents, setDocuments] = useState([]);
  const {uuid}= useParams();
  const [listupdateNote, setListupdateNote] = useState(false);
  const [noteValues, setNoteValues] = useState({});
  

  useEffect(() => {
    const getDocuments = () => {
      fetch(`http://localhost:3001/documents/${uuid}`)
        .then(res => res.json())
        .then(res => setDocuments(res.data));
    };

    getDocuments();
    setListupdateNote(false);
  }, [uuid,listupdateNote]);

  // const handleListUpdate = () => {
  //   setListupdateNote(prevState => !prevState);
  // };

  return (
    <Fragment>
      <NavbarDocuments brand="Documentos"/>
      <div className='container'>
        <div className='row'>
          <div className='col-14'>
            <br />
            <Documentlist documents={documents} setListupdateNote={setListupdateNote} noteValues={noteValues} setNoteValues={setNoteValues} setMessageApi={setMessageApi}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppDocuments;
