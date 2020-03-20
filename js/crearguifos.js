// Evento active del menu para seleccionar el tema
const btnTema = document.querySelector('#tema');
const subTemas = document.querySelector('#subtemas');


btnTema.addEventListener('click', (e)=> {
    subTemas.classList.toggle('active');
    e.stopPropagation();
})

// Cambio de tema
const btnDay = document.querySelector('#day');
const btnNight = document.querySelector('#night');
const estilo = document.querySelector('#estilo');
const logo = document.querySelector('#logo');

btnNight.addEventListener('click', ()=>{
    estilo.setAttribute("href", "./Style/style-night.css");
    logo.setAttribute("src", "./Images/gifOF_logo_dark.png");
    localStorage.setItem("dark-modo", "true");
})

btnDay.addEventListener('click', ()=>{
    estilo.setAttribute("href", "./Style/style-day.css");
    logo.setAttribute("src","./Images/gifOF_logo.png");
    localStorage.setItem("dark-modo", "false");
})

if(localStorage.getItem("dark-modo") === "true"){
    estilo.setAttribute("href", "./Style/style-night.css");
    logo.setAttribute("src", "./Images/gifOF_logo_dark.png");
} else {
    estilo.setAttribute("href", "./Style/style-day.css");
    logo.setAttribute("src","./Images/gifOF_logo.png");
}

// Cerrar menu de sugerencias y de temas
window.addEventListener('click', ()=>{
    subTemas.classList.remove('active');
})

// Seccion 2 comenzar
const vista1 = document.getElementById('vista1');
const btnComenzar = document.getElementById('btnComenzar');

btnComenzar.addEventListener('click', ()=>{
    vista1.style.display="none";
})

// Grabacion de video 
function getStreamAndRecord (){
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {min: 400},
            width: {min: 400}
        }
    })
    .then(function(stream){
        video.srcObject = stream;
        video.play();
    })
    .catch(error => console.log(error));
}
getStreamAndRecord();

let video = document.querySelector("#video");
