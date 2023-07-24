import React from 'react';
import Swal from 'sweetalert2';
import "../../style.css";

const Notasbody = ({notes, setListupdateNote,noteValues,setNoteValues,setMessageApi }) => {
    // Función para manejar los cambios en los campos de cada fila
    const handleChange = (e, noteId) => {
      const { name, value } = e.target;
      setNoteValues((prevValues) => ({
        ...prevValues,
        [noteId]: {
          ...prevValues[noteId],
          [name]: value,
        },
      }));
    };
  
    //-----------------------Eliminar---------------------
    const eliminarNote = uuid => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:3001/notes/' + uuid, requestInit)
            .then(res => res.json())
            .then(res => {
              console.log(res);
              setMessageApi('Se ha eliminado una nota');
            })
        setListupdateNote(true)
        Swal.fire({ icon: 'error', title: 'Nota Eliminada' })
    }

  
    //-----------------------Actualizar---------------------
    const actualizarNote = (uuid) => {
      const noteToUpdate = noteValues[uuid];
      if (!noteToUpdate || noteToUpdate.title === '' || noteToUpdate.note === '') {
        Swal.fire({ icon: 'warning', title: 'Favor de acompletar todos los campos' });
        return;
      }
  
      const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteToUpdate),
      };
  
      fetch('http://localhost:3001/notes/' + uuid, requestInit)
        .then((res) => res.json())
        .then((res) => console.log(res));
  
      setListupdateNote(true);
      Swal.fire({ icon: 'success', title: 'Nota Actualizada' });
    };
  
    return (
      <section className='Proyectos' id='Proyectos'>
        <div className='services-content'>
          {notes.map((note) => (
            <div className='box' key={note.uuid}>
              <h3 className='h31'>
                {note.title}
                <button onClick={() => eliminarNote(note.uuid)} className='btn btn-outline-danger fa fa-trash'></button>
                <button className='btn btn-outline-warning fa fa-pencil' data-bs-toggle='modal' data-bs-target={`#ModalActualizar-${note.uuid}`}></button>
              </h3>
              <p className='p1'>{note.note}</p>
  
              {/* Modal para cada fila */}
              <div className='modal fade' id={`ModalActualizar-${note.uuid}`} tabIndex={-1} aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-5' id='exampleModalLabel'>Actualizar Nota</h1>
                      <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                      <br />
                      <form className='row g-3'>
                        <div className='row'>
                          <div className='col-md-12'>
                            <input name='title' onChange={(e) => handleChange(e, note.uuid)} type='text' id='title' className='form-control' placeholder='Título'/>
                          </div>
                          <br />
                          <br />
                          <div className='col-md-12'>
                            <input name='note' onChange={(e) => handleChange(e, note.uuid)} type='text' id='note' className='form-control' placeholder='Nota'/>
                          </div>
                          <div className='row justify-content-start text-center mt-5'>
                            <div className='col-12'>
                              <button type='submit' className='btn btn-primary' onClick={() => actualizarNote(note.uuid)}>
                                Actualizar
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br/>
        <br/>
      </section>
    );
  };
  
  export default Notasbody;