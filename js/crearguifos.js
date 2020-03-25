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
const vista3 = document.getElementById('vista3');
const vista4 = document.getElementById('vista4');
const opciones1 = document.getElementById('opciones1');
const opciones2 = document.getElementById('opciones2');
const opciones3 = document.getElementById('opciones3');
const btnComenzar = document.getElementById('btnComenzar');
const btnCapturar = document.getElementById('btnCapturar');
const btnListo = document.getElementById('btnListo');
const btnRepetir = document.getElementById('btnRepetir');
const btnSubir = document.getElementById('btnSubir');
const btnDescargar = document.getElementById('btnDescargar')
const newGif = document.getElementById('nuevoGif');

btnComenzar.addEventListener('click', ()=>{
    vista1.style.display="none";
    vista2.style.display="block";
    getStreamAndRecord();
})



const image = document.getElementById('imgGif');
const video = document.querySelector('video');
let gifsEl = document.getElementById('misgifs');


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

// Grabacion de video 

function getStreamAndRecord(){
    video.style.display="block";
    image.style.display="none";
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function(stream) {
        video.srcObject = stream;
        video.play();
        let recorder = RecordRTC(stream, {
            type: 'gif',
            framRate: 1,
            quality: 10,
            hidden: 240,
        });
        let blob;
        let urlgif;
        console.log(recorder);
        btnCapturar.addEventListener('click', (e)=>{
            if(e.target.id !== "btnCapturar"){
                console.log('Presionaste un boton y se empezara a grabar'); 
                opciones1.style.display="none";
                opciones2.style.display="flex";
                recorder.startRecording();
                recorder.stream = stream;
                btnListo.disabled = false;
            }
            
        })
        
        btnListo.addEventListener('click', (e)=>{
            if(e.target.id !== "btnListo"){
                console.log('Presionaste un boton y se va a guardar lo que grabaste'); 
                opciones2.style.display="none";
                opciones3.style.display="flex";
                this.disabled = true;
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
                urlgif = `http://api.giphy.com/v1/gifs/${idgif}?api_key=${api_key}`
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
        btnRepetir.addEventListener('click', ()=>{
            opciones3.style.display="none";
            opciones1.style.display="block";
            recorder.stream.stop()
            recorder.destroy();
            recorder = null;
            getStreamAndRecord();
        })
        
    }); 
} 

function añadirGif(urlImage){
    misGifs.push(urlImage);
    misGifs.forEach(element =>{
        gifHTML = `<div class="misGuifos"><img src="${element}" alt="Gif subido"></div>`
        gifsEl.innerHTML += gifHTML;
    })
    localStorage.setItem('gif', JSON.stringify(misGifs));
}
