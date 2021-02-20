// Cambio de vistas
const vista1 = document.getElementById('vista1');
const vista2 = document.getElementById('vista2');
const vista3 = document.getElementById('vista3');
const vista4 = document.getElementById('vista4');
const opciones1 = document.getElementById('opciones1');
const opciones2 = document.getElementById('opciones2');
const opciones3 = document.getElementById('opciones3');

// Botones
const btnComenzar = document.getElementById('btnComenzar');
const btnCapturar = document.getElementById('btnCapturar');
const btnListo = document.getElementById('btnListo');
const btnRepetir = document.getElementById('btnRepetir');
const btnSubir = document.getElementById('btnSubir');
const btnDescargar = document.getElementById('btnDescargar')
const btnCopiar = document.getElementById('btnCopiar');

// Elementos para grabar y contener el gif
const image = document.getElementById('imgGif');
const video = document.querySelector('video');
const newGif = document.getElementById('nuevoGif');
const gifsEl = document.getElementById('misgifs');


//Recuperación de "Mis Guifos" guardados en el localStorage
let gifsGuardados = localStorage.getItem('gif');
let misGifs = [];
misGifs = JSON.parse(gifsGuardados);
if(misGifs !== null){
    misGifs.forEach(element =>{
        gifHTML = `<div class="misGuifos"><img src="${element}" alt="Gif subido"></div>`
        gifsEl.innerHTML += gifHTML;
    })
} else{
    misGifs = [];
}

// Variables globales para la funcionalidad de grabar video
let recorder; 
let blob; 
let urlGiphy;
let timer;
let minutos;
let segundos;

// EVENTOS DE LOS BOTONES
btnComenzar.addEventListener('click', (e)=>{
    vista1.style.display="none";
    vista2.style.display="block";
    video.style.display="block";
    image.style.display="none";
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function(stream) {
        video.srcObject = stream;
        video.play();
        recorder = RecordRTC(stream, {
            type: 'gif',
            framRate: 1,
            quality: 10,
            hidden: 240,
        });
    })
}); 

btnCapturar.addEventListener('click', (e)=>{
    if(e.target.id !== "btnCapturar"){
        opciones1.style.display="none";
        opciones2.style.display="flex";
        recorder.startRecording();
        //Timer
        segundos = 0;
        minutos = 0;
        timer = setInterval(()=>{
            if(segundos < 60){
                if(segundos <= 9){
                    segundos = '0' + segundos;
                }
                document.getElementById('timer').innerHTML=`00:00:0${minutos}:${segundos}`;
                segundos++;
            }else{
                minutos++;
                segundos = 0;
            }
        },1000)
    }
})

btnListo.addEventListener('click', (e)=>{
    if(e.target.id !== "btnListo"){
        opciones2.style.display="none";
        opciones3.style.display="flex";
        // Timer
        clearInterval(timer);
        if(segundos <=9){
            segundos = '0' + segundos;
        }
        if(minutos <=6){
            minutos = '0' + minutos;
        }
        document.getElementById('tiempo').innerHTML=`00:00:${minutos}:${segundos}`;
        // Grabacion
        recorder.stopRecording(function() {
            video.style.display="none";
            image.style.display="block";
            blob = recorder.getBlob();
            image.src = URL.createObjectURL(blob);
            
        })
    }
});

btnRepetir.addEventListener('click', (e)=>{
    opciones3.style.display="none";
    opciones1.style.display="block";
    recorder.reset();
    video.style.display="block";
    image.style.display="none";
    video.play();
})

btnSubir.addEventListener('click', (e) =>{
    vista2.style.display="none";
    vista3.style.display="block";
    let form = new FormData();
    form.append('file', blob, 'GifRecorder.gif')
    const api_key = '60j6blu7K1BahTceUDM7FC8TRZ6QwbkF'
    const url = `https://upload.giphy.com/v1/gifs`
    form.append('api_key', api_key)

    fetch(url,{
        method:'POST',
        body: form,
    }).then(res=>res.json())
    .then(datar=>{
        let idgif = datar.data.id;
        let urlgif = `https://api.giphy.com/v1/gifs/${idgif}?api_key=${api_key}`
        fetch(urlgif).then(res => res.json())
            .then(json =>{
            urlGiphy = json.data.url;
            let urlImage = json.data.images.fixed_width.url;
            newGif.setAttribute('src', urlImage);
            vista3.style.display="none";
            vista4.style.display="block";
            añadirGif(urlImage);
            
        })
    })
});

btnDescargar.addEventListener('click', ()=>{
    recorder.save();
});

btnCopiar.addEventListener('click', ()=>{
    copiarPortapaleles();
    
})
btnCerrar.addEventListener('click', ()=>{
    vista4.style.display="none";
})
// Funcion para copiar el link del gif al portapaleles
function copiarPortapaleles(){
    let aux = document.createElement("input");
    aux.setAttribute('value', urlGiphy);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
}

// Almacenamiento al local Storage de los gifs grabados y subidos. 
function añadirGif(urlImage){
    misGifs.push(urlImage);
    gifHTML = `<div class="misGuifos"><img src="${urlImage}" alt="Gif subido"></div>`
    gifsEl.innerHTML += gifHTML;
    localStorage.setItem('gif', JSON.stringify(misGifs));
}

// Animacion de cuando se suben los gifs a la API
let contadorRectangulos = 0;
let rectangulos = document.querySelectorAll('.rectangulo');

setInterval(()=>{
    if(contadorRectangulos<rectangulos.length){
        rectangulos.item(contadorRectangulos).classList.toggle('activo');
        contadorRectangulos++;
    }else{
        contadorRectangulos = 0;
    }
},100);