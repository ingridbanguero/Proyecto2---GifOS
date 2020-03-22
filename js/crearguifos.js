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

// Cambio de vistas
const vista1 = document.getElementById('vista1');
const vista2 = document.getElementById('vista2');
const opciones1 = document.getElementById('opciones1');
const opciones2 = document.getElementById('opciones2');
const opciones3 = document.getElementById('opciones3');
const btnComenzar = document.getElementById('btnComenzar');
const btnCapturar = document.getElementById('btnCapturar');
const btnListo = document.getElementById('btnListo');
const btnRepetir = document.getElementById('btnRepetir');
const btnSubir = document.getElementById('btnSubir');
const vistaPrevia = document.getElementById('vistaPrevia');
console.log(btnListo)

btnComenzar.addEventListener('click', ()=>{
    vista1.style.display="none";
    vista2.style.display="block";
    getStreamAndRecord()
})

btnCapturar.addEventListener('click', (e)=>{
    if(e.target.id !== "btnCapturar"){
        console.log('Presionaste un boton y se empezara a grabar'); 
    }
    opciones1.style.display="none";
    opciones2.style.display="flex";
    
})

btnListo.addEventListener('click', (e)=>{
    if(e.target.id !== "btnListo"){
        console.log('Presionaste un boton y se va a guardar lo que grabaste'); 
    }
    opciones2.style.display="none";
    opciones3.style.display="flex";
})

btnRepetir.addEventListener('click', ()=>{
    opciones3.style.display="none";
    opciones1.style.display="block";
    getStreamAndRecord()
})

let Myvideo = document.getElementById('video');
// Grabacion de video 

function getStreamAndRecord(){
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {min: 400},
            width: {min: 400}
        }
    }).then(async function(stream) {
        video.srcObject = stream; 
        video.play();
        let recorder = RecordRTC(stream, {
            type: 'gif',
            framRate: 1,
            quality: 10,
            hidden: 240,
            /* onGifRecordingStarted: function(){
                console.log('started')
            }, */
        });
        btnCapturar.addEventListener('click', (e)=>{
            recorder.startRecording();
        })
        
        btnListo.addEventListener('click', (e)=>{
            recorder.stopRecording(function(url, type) {
                document.querySelector(type).srcObject = null;
                document.querySelector(type).src = url;
                document.querySelector(type).play()
            })
        });
    });
}