// Evento active del menu para seleccionar el tema
const btnTema = document.querySelector('#tema');
const subTemas = document.querySelector('#subtemas');


btnTema.addEventListener('click', ()=> {
    subTemas.classList.toggle('active');
})

// Cambio de tema
const btnDay = document.querySelector('#day');
const btnNight = document.querySelector('#night');
const estilo = document.querySelector('#estilo');
const logo = document.querySelector('#logo');

btnNight.addEventListener('click', ()=>{
    estilo.setAttribute("href", "./Style/style-night.css");
    logo.setAttribute("src", "./Images/gifOF_logo_dark.png");
})

btnDay.addEventListener('click', ()=>{
    estilo.setAttribute("href", "./Style/style-day.css");
    logo.setAttribute("src","./Images/gifOF_logo.png");
})


// Integración con la API por el buscador
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('results')
let q = 'random';
search(q);

searchForm.addEventListener('submit', function(e){
    e.preventDefault()
    q = searchInput.value
    search(q);
})

function search(q){
    const apiKey = '60j6blu7K1BahTceUDM7FC8TRZ6QwbkF';
    const path = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12`
    fetch(path).then(function(res) {
        return res.json() // Promise
    }).then(function(json){
        // console.log(json.data[0].images.fixed_width.url)
        let resultsHTML = ''
        json.data.forEach(function(obj){
            // console.log(obj)
            // console.log(obj.images.fixed_width.url)
            const url = obj.images.fixed_width.url
            const title = obj.title
            let tag = '';
            // console.log(title);
            let arrayTitle = title.split(" ");
            arrayTitle.forEach((elemento)=>{
                if (elemento !== "GIF"){
                    tag += '#' + elemento + " "
                }
            } );
            // console.log(arrayTitle);
            // console.log(tag);
            resultsHTML += `<div class="tendencia"> <img src="${url}" alt="${title}"><p>${tag}</p></div>`
        })
        resultsEl.innerHTML = resultsHTML
    }).catch(function(err){
        console.log(err.message)
    })
}

// Menu sugerencia de resultados de busqueda

const menu_busqueda = document.querySelector('#busqueda');

searchInput.addEventListener("click",()=>{
    menu_busqueda.classList.add('active');
})

const sugerencia1 = document.getElementById('sugerido1');
const sugerencia2 = document.getElementById('sugerido2');
const sugerencia3 = document.getElementById('sugerido3');

sugerencia1.addEventListener('click', ()=>{
    q = sugerencia1.value;
    search(q);
})

sugerencia2.addEventListener('click', ()=>{
    q = sugerencia2.value;
    search(q);
})

sugerencia3.addEventListener('click', ()=>{
    q = sugerencia3.value;
    search(q);
})

// Gifs de seccion Hoy te sugerimos
const sugerencias = document.getElementById('sugerencias');
let sugeridos = ["Jonathan Van Ness", "Sailor Mercury", "Glitter", "Unicorn and Raibows"];
let sugerenciaHTML = "";
let nomSug = [];
let i = 1;

sugeridos.forEach(element => {
    // console.log(element);
    const apiKey = '60j6blu7K1BahTceUDM7FC8TRZ6QwbkF';
    const path = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${element}&limit=12`
    fetch(path).then(function(res) {
        return res.json() // Promise
    }).then(function(json){
        // console.log(json.data[0].images.fixed_width.url)
        const url = json.data[0].images.fixed_width.url
        const title = element.title;
        
        nomSug.push(element);
        sugerenciaHTML += `<div id="sugerencia${i}" class="sugerencia">
        <div class="titulo_sugerencia">
            <h3>#${element}</h3>
            <button onclick="eliminarSug${i}"><img src="./Images/button3.svg" alt=""></button>
        </div>
        <div id="sug1" class="imagen_sugerencia">
            <img src="${url}" alt="${title}">
            <button href="#seccion_tendencias" onclick="verMas${i}()" value="${element}">Ver más...</a>
        </div>
        </div>`
        
        // console.log(sugerenciaHTML) 
        sugerencias.innerHTML = sugerenciaHTML;
        i++;
    }).catch(function(err){
        console.log(err.message)
    })
})
function verMas1(){
    search(nomSug[0]); 
}
function verMas2(){
    search(nomSug[1]); 
}
function verMas3(){
    search(nomSug[2]); 
}
function verMas4(){
    search(nomSug[3]); 
}


const eliminado = document.getElementById('sugerencia1');
function eliminarSug1(){
    console.log('A eliminar')
}

