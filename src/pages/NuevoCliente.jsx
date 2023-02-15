import { useNavigate, Form, useActionData } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function action({request}){
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);

    const email = datos.email;

    //Validacion Formulario
  const errores = []
  if(Object.values(datos).includes('')){
      errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)){
    errores.push('El email no es valido')
    
  }

  //Retornar datos si hay errores
  if(Object.keys(errores).length){
    return errores
  }

  return datos
}   

const NuevoCliente = () => {

    const errores = useActionData();
    const navigate = useNavigate();
    console.log(errores)
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>
   
        <div className="flex justify-end">
            <button 
                className="bg-blue-800 text-white px-3 py1 font-bold uppercase"
                onClick={() => navigate('/')}
            >
                Volver
            </button>
        </div>
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
            {
                errores?.length && errores.map((error, index) => <Error key={index}>{error}</Error> )
            }
            <Form
                method="POST"
                noValidate
            >
                <Formulario />

                <input type="submit"
                    className="bg-blue-800 w-full text-white p-3 font-bold uppercase text-lg"
                    value="Registrar Cliente"
                />
            </Form>

        </div>
   
    </>
  );
};

export default NuevoCliente;
