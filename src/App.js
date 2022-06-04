import React from "react";
import { firebase } from "./firebase";

function App() {
  //hoocks
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [telefono, setTelefono] = React.useState('')
  const [cedula, setCedula] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [list, setList] = React.useState([])
  const [error, setError] = React.useState(null)
  const [consultar, setConsultar] = React.useState(true)

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData =
          data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setList(arrayData)
      } catch (error) {
        console.log(error);
      }
    }
    obtenerDatos()
  }, [])

  const guardarDatos = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Introducir Nombre')
      return
    }
    if (!apellido.trim()) {
      setError('Introducir Apellido')
      return
    }
    if (!cedula.trim()) {
      setError('Introducir Cedula')
      return
    } if (!telefono.trim()) {
      setError('Introducir Telefono')
      return
    }
    if (!email.trim()) {
      setError('Introducir email')
      return
    }
    if (telefono.length < 7 || telefono.length > 10 || telefono.length === 9 || telefono.length === 8) {
      setError('El telefono debe contener 7 o 10 digitos')
      return
    }
    if (cedula.length < 8 || cedula.length > 10 || cedula.length === 9) {
      setError('El telefono debe contener 8 o 10 digitos')
      return
    }
    if (!isNaN(nombre)) {
      setError("Nombre Invalido")
      return
    }

    if (!isNaN(apellido)) {
      setError("Apellido Invalido")
      return
    }
    if (isNaN(telefono) && Math.sign(-1)) {
      setError("Telefono Invalido")
      return
    }
    if (isNaN(cedula) && Math.sign(-1)) {
      setError("Cedula Invalida")
      return
    }

    const invalido = list.find((x) => telefono === x.telefono)
    if (invalido !== undefined) {
      setError("Telefono existente")
      return
    }

    const correoInvalido = list.find((x) => email === x.email)
    if (correoInvalido !== undefined) {
      setError("Correo existente")
      return
    }

    const cedulaInvalida = list.find((x) => cedula === x.cedula)
    if (cedulaInvalida !== undefined) {
      setError("Cedula existente")
      return
    }
    try {
      const db = firebase.firestore()
      const nuevoUsuario = {
        nombre, apellido, cedula, telefono, email
      }
      const dato = await
        db.collection('usuarios').add(nuevoUsuario)
      //agregarndo a la lista
      setList([
        ...list,
        { ...nuevoUsuario, id: dato.id }
      ])
    } catch (error) {
      console.log(error);
    }
    setNombre('')
    setApellido('')
    setCedula('')
    setTelefono('')
    setEmail('')
    setError(null)

  }

  const eliminarDato = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const
        listaFiltrada = list.filter((elemento) => elemento.id !== id)
      setList(listaFiltrada)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-xl-4">
          <h2 className="text-center ">Registro de usuario</h2>
          <br />
          <form onSubmit={guardarDatos}>
            {
              error ? (
                <div className='alert alert-danger'>{error}</div>
              ) : null
            }
            <input type="text"
              placeholder="Ingresar Nombre"
              className="form-control mb-3"
              onChange={(e) => { setNombre(e.target.value) }}
              value={nombre}
            />
            <input type="text"
              placeholder="Ingresar Apellido"
              className="form-control mb-3"
              onChange={(e) => { setApellido(e.target.value) }}
              value={apellido}
            />
            <input type="text"
              placeholder="Ingresar Cedula"
              className="form-control mb-3"
              onChange={(e) => { setCedula(e.target.value) }}
              value={cedula}
            />
            <input type="text"
              placeholder="Ingresar Telefono"
              className="form-control mb-3"
              onChange={(e) => { setTelefono(e.target.value) }}
              value={telefono}
            />
            <input type="email"
              placeholder="Ingresar Correo"
              className="form-control mb-3"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
            />
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-dark mb-3 item-center">Agregar</button>
            </div>
          </form>
        </div>
        <div row justify-content-center>
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className='btn btn-dark' type='button' onClick={() => { setConsultar(!consultar) }}>
              {
                consultar ? 'Consultar' : 'Ocultar'
              }
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <span>
          {
            consultar ? (<div> </div>) :
              (<div className="Lista">
                <h1 className="text-center">Lista de Usuarios</h1>
                <ul className="list-group list-group-flush">
                  {
                    list.map((element) =>
                      <li className="list-group-item" key={element.id}>{element.nombre} {element.apellido} {element.cedula} {element.telefono} {element.email}
                        <button className="btn btn-danger mx-2 float-end" onClick={() => eliminarDato(element.id)}>Eliminar</button>
                      </li>
                    )
                  }
                </ul>
              </div>)
          }
        </span>

      </div>
    </div>



  );
}

export default App;
