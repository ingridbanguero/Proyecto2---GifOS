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

// Eventos de los botones
btnComenzar.addEventListener('click', (e)=>{
    vista1.style.display="none";
    vista2.style.display="block";
    video.style.display="block";
    image.style.display="none";
    //Promesa
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
        console.log(recorder);
    })
}); 

btnCapturar.addEventListener('click', (e)=>{
    if(e.target.id !== "btnCapturar"){
        console.log('Presionaste un boton y se empezara a grabar'); 
        opciones1.style.display="none";
        opciones2.style.display="flex";
        recorder.startRecording();
    }
})

btnListo.addEventListener('click', (e)=>{
    if(e.target.id !== "btnListo"){
        console.log('Presionaste un boton y se va a guardar lo que grabaste'); 
        opciones2.style.display="none";
        opciones3.style.display="flex";
        recorder.stopRecording(function() {
            video.style.display="none";
            image.style.display="block";
            blob = recorder.getBlob();
            image.src = URL.createObjectURL(blob);
            console.log(blob);
            console.log(recorder);
            
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
    console.log(form.get('file'))
    const api_key = '60j6blu7K1BahTceUDM7FC8TRZ6QwbkF'
    const url = `http://upload.giphy.com/v1/gifs`
    form.append('api_key', api_key)

    fetch(url,{
        method:'POST',
        body: form,
    }).then(res=>res.json())
    .then(datar=>{
        console.log(datar.data.id)
        let idgif = datar.data.id;
        console.log(datar);
        let urlgif = `http://api.giphy.com/v1/gifs/${idgif}?api_key=${api_key}`
        console.log(urlgif);
        fetch(urlgif).then(res => res.json())
            .then(json =>{
            console.log(json);
            console.log(json.data.images.fixed_width.url);
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
})

// Almacenamiento al local Storage de los gifs grabados y subidos. 
function añadirGif(urlImage){
    misGifs.push(urlImage);
    gifHTML = `<div class="misGuifos"><img src="${urlImage}" alt="Gif subido"></div>`
    gifsEl.innerHTML += gifHTML;
    localStorage.setItem('gif', JSON.stringify(misGifs));
}
