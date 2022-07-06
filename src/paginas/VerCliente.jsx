import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"

const VerCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setCargando(!cargando)
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        setCargando(false)
      }, 1000);
      
    }
    obtenerClienteAPI()
  }, [])


  return (

    Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (

      <div>
        {cargando ? <Spinner /> : (
          <>
            <h1 className='font-black text-4xl text-blue-900'>Ver Cliente</h1>
            <p className='mt-3'>Aqui tienes la información del cliente seleccionado</p>

            <p className="text-2xl text-gray-700 mt-4  ">
              <span className="text-gray-600 uppercase font-bold">Cliente: </span>
              {cliente.nombre}
            </p>
            <p className="text-2xl text-gray-700 mt-4">
              <span className="text-gray-600 uppercase font-bold">Email: </span>
              {cliente.email}
            </p>
            <p className="text-2xl text-gray-700 mt-4">
              <span className="text-gray-600 uppercase font-bold">Telefono: </span>
              {cliente.telefono}
            </p>
            <p className="text-2xl text-gray-700 mt-4">
              <span className="text-gray-600 uppercase font-bold">Empresa: </span>
              {cliente.empresa}
            </p>
            <p className="text-2xl text-gray-700 mt-4">
              <span className="text-gray-600 uppercase font-bold">Notas: </span>
              {cliente.notas}
            </p>
          </>
        )}
      </div>
    )
  )
}

export default VerCliente