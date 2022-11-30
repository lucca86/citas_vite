import { useEffect, useState } from "react";
import Error from "./Error";


const Form = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [alta, setAlta] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
       if( Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setAlta(paciente.alta);
            setSintomas(paciente.sintomas);
       }
      
    }, [paciente])
   
    


    const generarId = () => {

        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return random + fecha

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validación del formulario
        if([nombre, propietario, email, alta, sintomas].includes('')) {
            console.log('');
            setError(true)
            return;
        } 
    
        setError(false);

        // objeto de paciente 
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            alta,
            sintomas
        }

        if(paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map( pa => (
                pa.id === paciente.id ? objetoPaciente : pa
            ))

            setPacientes( pacientesActualizados )
            setPaciente({})

        } else {

            // Nuevo registro
    
            // console.log(paciente);
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }


        // Reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setAlta('')
        setSintomas('')
    }


  return (
    <div className="md:w-1/2 lg:w-2/5 m-5">
        <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">Agregar Pacientes y {''}
            <span className="text-indigo-600 font-bold text-lg">Administralos</span>
        </p>

        <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
            {error && <Error mensaje={'Todos los campos son obligatorios'} /> }
            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre de la Mascota</label>
                <input 
                    id="mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                    type="text" 
                    placeholder="Nombre de la mascota"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre del propietario</label>
                <input 
                    id="propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                    type="text" 
                    placeholder="Nombre del propietario"
                    value={propietario}
                    onChange={(e) => setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                <input 
                    id="email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                    type="email" 
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                <input 
                    id="alta"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                    type="date" 
                    value={alta}
                    onChange={(e) => setAlta(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="sintomas"
                    placeholder="Describe los síntomas"
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)}
                />
            </div>
            <input 
                type='submit'
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-700 transition-all"
                value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />
        </form>
    </div>
  )
}

export default Form