// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Variables para los campos a validar
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListeners();   
function eventListeners(){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Reinicia el formulario
   btnReset.addEventListener('click', resetearFormulario, botonDisabled);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail)
}


// Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}
function botonDisabled(){
    btnReset.disabled = true;
    btnReset.classList.add('cursor-not-allowed', 'opacity-50');
}



// Valida el formulario

function validarFormulario(e){
    


   if(e.target.value.length > 0){
    // Eliminar los errores...
    const error = document.querySelector('p.error');
        if(error!== null){
            error.remove();
        }



    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
   }else{
    e.target.classList.remove('border', 'border-green-500');
       e.target.classList.add('border', 'border-red-500');

       mostrarError('Todos los campos son obligatorios');
   }

   if(e.target.type === 'email'){
       // const resultado = e.target.value.indexOf('@');
       if(expresionRegular.test( e.target.value )){
        const error = document.querySelector('p.error');
        if(error!== null){
            error.remove();
        }

    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
       } else{
        e.target.classList.remove('border', 'border-green-500');
       e.target.classList.add('border', 'border-red-500');

       mostrarError('Email no válido');
       }
    }

    if(expresionRegular.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }

   
    
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){ // .length solo existe en .querySelectorAll
        formulario.appendChild(mensajeError);
}
    }

// Funcion que simula el envio del email    
function enviarEmail(e){
    e.preventDefault();

    // Mostrar el load
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Después de 3 segundos ocultar el load y mostrar el mensaje
    //setInterval se ejecuta cada 3 segundos(depende el tiempo que le des)
    // setInterval(() => {
    //     console.log('Se esta ejecutando cada 3 segundos')      
    // }, 3000);
   
   setTimeout (() =>{
        spinner.style.display = 'none';
        // Notificacion que dice que se envió correctamente
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envió correctamente';
    parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

    // Inserta parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    // Eliminar el parrafo de que se envio el mail con otro setTimeout
    setTimeout(() => {
        parrafo.remove();
        resetearFormulario();
    }, 5000);

    },3000);

    
}

// Función que resetea el formulario
function resetearFormulario(){
    
    formulario.reset();
   
    iniciarApp();
    
}




