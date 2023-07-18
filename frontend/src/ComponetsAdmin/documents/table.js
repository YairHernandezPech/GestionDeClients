import React from 'react';
import Swal from 'sweetalert2';

const Documentlist = ({ documents, setListupdateNote, setMessageApi  }) => {

  //-----------------------Eliminar---------------------
  const eliminarNote = _id => {
    const requestInit = {
      method: 'DELETE'
    };
    fetch('http://localhost:3001/documents/delete/' + _id, requestInit)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setMessageApi('Se ha eliminado un documento');
      })
      .then(res => {
        Swal.fire({ icon: 'error', title: 'Documento Eliminado' })
        setListupdateNote(true);
      });
  };

  return (
    <div className='container text-center'>
      <div className='row align-items-start'>
        <main className='container' role='main'>
          <div className='row'>
            <div className='col-12'>
              <div className='table-responsive'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Key</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map(document => (
                      <tr key={document._id}>
                        <td>{document.name}</td>
                        <td>{document.status}</td>
                        <td>{document.type}</td>
                        <td>{document.key}</td>
                        <td>{document.createdAT.substring(0, 10)}</td>
                        <td> {document.url.endsWith('.jpg') || document.url.endsWith('.png') ? (<a href={document.url} target='_blank' rel='noopener noreferrer'><i className='btn btn-outline-secondary fa fa-file-image-o' aria-hidden='true'></i></a>) : (
                          document.url.endsWith('.pdf') && (<a href={document.url} target='_blank' rel='noopener noreferrer'><i className='btn btn-outline-secondary fa fa-file-pdf-o' aria-hidden='true'></i></a>))}</td>
                        <td>
                          <div className='mb-3'>
                            <button onClick={() => eliminarNote(document.key)} className='btn btn-danger fa fa-trash'></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentlist;
