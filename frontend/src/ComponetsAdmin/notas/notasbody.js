import React from 'react';
import Swal from 'sweetalert2';
import "../../style.css";

const Notasbody = ({notes, setListupdateNote,noteValues,setNoteValues }) => {
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
    const eliminarNote = _id => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:3001/notes/delete/' + _id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
        setListupdateNote(true)
        Swal.fire({ icon: 'error', title: 'Nota Eliminada' })
    }

  
    //-----------------------Actualizar---------------------
    const actualizarNote = (_id) => {
      const noteToUpdate = noteValues[_id];
      if (!noteToUpdate || noteToUpdate.title === '' || noteToUpdate.note === '') {
        Swal.fire({ icon: 'warning', title: 'Favor de acompletar todos los campos' });
        return;
      }
  
      const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteToUpdate),
      };
  
      fetch('http://localhost:3001/notes/update/' + _id, requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));
  
      setListupdateNote(true);
      Swal.fire({ icon: 'success', title: 'Nota Actualizada' });
    };
  
    return (
      <section className='Proyectos' id='Proyectos'>
        <div className='services-content'>
          {notes.map((note) => (
            <div className='box' key={note._id}>
              <h3 className='h31'>
                {note.title}
                <button onClick={() => eliminarNote(note._id)} className='btn btn-outline-danger fa fa-trash'></button>
                <button className='btn btn-outline-warning fa fa-pencil' data-bs-toggle='modal' data-bs-target={`#ModalActualizar-${note._id}`}></button>
              </h3>
              <p className='p1'>{note.note}</p>
  
              {/* Modal para cada fila */}
              <div className='modal fade' id={`ModalActualizar-${note._id}`} tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
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
                            <input name='title' onChange={(e) => handleChange(e, note._id)} type='text' id='title' className='form-control' placeholder='Título'/>
                          </div>
                          <br />
                          <br />
                          <div className='col-md-12'>
                            <input name='note' onChange={(e) => handleChange(e, note._id)} type='text' id='note' className='form-control' placeholder='Nota'/>
                          </div>
                          <div className='row justify-content-start text-center mt-5'>
                            <div className='col-12'>
                              <button type='submit' className='btn btn-primary' onClick={() => actualizarNote(note._id)}>
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