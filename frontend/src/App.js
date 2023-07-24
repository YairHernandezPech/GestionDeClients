import { Fragment, useState } from "react";
import Body from "./Login/body";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppClients from "./AppClients";
import AppNotes from "./AppNotas";
import AppDocuments from "./AppDocuments";
function App() {
//Mensaje
const [MessageApi, setMessageApi] = useState('');
  return (
    <Router>
      <Routes>
        <Route path="/" element={ 
        <Fragment> <Body></Body> </Fragment> } 
        />
        <Route path="/clients" element={<AppClients setMessageApi={setMessageApi} MessageApi={MessageApi}/>}/>
        <Route path="/notes/:uuidClient" element={<AppNotes setMessageApi={setMessageApi}/>} />
        <Route path="/documents/:uuid" element={<AppDocuments setMessageApi={setMessageApi}/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
