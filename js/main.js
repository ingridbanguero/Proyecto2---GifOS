// Integración con la API por el buscador
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('results')
const tendencias = document.getElementById('tendencias');
let sugerenciaHTML = "";

// Busqueda por defecto al iniciar la pagina
search('Trending');

// Iniciar busqueda mediante el submit
searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    q = searchInput.value;
    search(q);
})

// Botones de sugeridos dinamicos
const sug1 = document.getElementById('sugerido1');
const sug2 = document.getElementById('sugerido2');
const sug3 = document.getElementById('sugerido3');
const sugest = document.getElementsByClassName('sug');

searchForm.addEventListener('keyup', ()=>{
q = searchInput.value;
    const apiKey = '60j6blu7K1BahTceUDM7FC8TRZ6QwbkF';
    const path = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=3`
    fetch(path).then(function(res) {
        return res.json()
    }).then(function(json){
        for (i=0; i<=2; i++){
            if(json.data[i] !== undefined){
                let title = json.data[i].title;
                let tag = '';
                let arrayTitle = title.split(" ");
                for (let i=0; i<=3; i++){
                    if (arrayTitle[i] !== "GIF" && arrayTitle[i] !== "by" && arrayTitle[i] !== undefined){
                        arrayTitle[i] = arrayTitle[i];
                        tag += arrayTitle[i] + " "
                    }
                } 
                sugest[i].innerHTML = tag;
                sugest[i].value = tag;
            }
        };
    })
})

// Barra historial busquedas recientes
const historial = document.getElementById('recientes');
let historialGuardado = localStorage.getItem('historial')
let historialSug = [];
historialSug = JSON.parse(historialGuardado);
if (historialSug !== null){
    historialSug.forEach(element =>{
        sugerenciaHTML = `<button>#${element}</button>`
        historial.innerHTML += sugerenciaHTML;
    })
} else {
    historialSug = [];
}

historial.addEventListener('click', (e)=>{
    if (e.target.id !== "historial"){
        q = e.target.innerText.slice(1);
        search(q);
        window.location.href='#seccion_tendencias'
    }
})

function searchHistory(q){
    historialSug.unshift(q);
    if(historialSug.length>10){
        historialSug.pop();
    }
    historial.innerHTML = "";
    historialSug.forEach(element =>{
        sugerenciaHTML = `<button>#${element}</button>`
        historial.innerHTML += sugerenciaHTML;
    })
    localStorage.setItem('historial', JSON.stringify(historialSug));
}

//  SECCION TENDENCIAS Y SU INTEGRACION CON EL BUSCADOR
function search(q){
    const apiKey = '60j6blu7K1BahTceUDM7FC8TRZ6QwbkF';
    const path = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12`
    fetch(path).then(function(res) {
        return res.json()
    }).then(function(json){
        // console.log(json.data[0].images.fixed_width.url)
        let resultsHTML = ''
        json.data.forEach(function(obj){
            // console.log(obj)
            const height = obj.images.fixed_width.height;
            const width = obj.images.fixed_width.width;
            // console.log(obj.images.fixed_width.url)
            const url = obj.images.fixed_width.url
            const title = obj.title
            let tag = '';
            let arrayTitle = title.split(" ");
            for (let i=0; i<=3; i++){
                if (arrayTitle[i] !== "GIF" && arrayTitle[i] !== "by" && arrayTitle[i] !== undefined){
                    arrayTitle[i] = arrayTitle[i];
                    tag += '#' + arrayTitle[i] + " "
                }
            } 
            // console.log(arrayTitle);
            // console.log(tag);

            resultsHTML += `<div class="tendencia"><img src="${url}" alt="${title}"><p>${tag}</p></div>`
            
            resultsEl.innerHTML = resultsHTML

        })
        
        
        
        if(q !== "Trending"){
            searchHistory(q);
            tendencias.innerHTML = q;
        }
    }).catch(function(err){
        console.log(err.message)
    })
}

// MENU SUGERENCIA DE RESULTADOS DE BUSQUEDA
const menu_busqueda = document.querySelector('#busqueda');

searchInput.addEventListener("click",(e)=>{
    menu_busqueda.classList.toggle('active');
    e.stopPropagation();
})

menu_busqueda.addEventListener('click', (e)=> {
    if(e.target.id !== "busqueda"){
        q = e.target.value;
        search(q);
        window.location.href='#seccion_tendencias'
    }
})

window.addEventListener('click', ()=>{
    menu_busqueda.classList.remove('active');
})

// SECCION HOY TE SUGERIMOS
const sugerencias = document.getElementById('sugerencias');
const imgSug = document.getElementsByClassName('imgSug');
const titleSug = document.getElementsByClassName('titleSug');
let sugeridos = ["Jonathan Van Ness", "Sailor Mercury", "Glitter", "Unicorn and Raibows"];
let i = 0;

async function getSugerencias(){
    const apiKey = '60j6blu7K1BahTceUDM7FC8TRZ6QwbkF';
    const path =`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`
    const resp = await fetch(path);
    const datos = await resp.json();
    for(i=0; i<=3; i++){
        let url = datos.data[i].images.fixed_width.url;
        let title = datos.data[i].title;
        let tag = '';
        let arrayTitle = title.split(" ");
            for (let i=0; i<=3; i++){
                if (arrayTitle[i] !== "GIF" && arrayTitle[i] !== "by" && arrayTitle[i] !== undefined){
                    arrayTitle[i] = arrayTitle[i];
                    tag += arrayTitle[i] + " "
                }
            } 
        const sugHTML = `<div class="sugerencia">
            <div class="titulo_sugerencia">
                <h3 class="titleSug">#${tag}</h3>
                <button name="eliminar"><img src="./Images/button3.svg" alt="Eliminar sugerencia"></button>
            </div>
            <div class="imagen_sugerencia">
                <img class="imgSug" src="${url}" alt="">
                <button name="buscar" value="${tag}" >Ver más...</button>
            </div>
        </div>`
        sugerencias.innerHTML += sugHTML;
    }
}
getSugerencias();

// Funcionamiento botones "Ver Mas..." y boton "X"
const sug = document.getElementById('sugerencias');
sug.addEventListener('click', (e)=>{
    if(e.target.name === "buscar"){
        search(e.target.value);
        tendencias.innerHTML = e.target.value;
        window.location.href='#seccion_tendencias';
    } else if (e.target.alt === "Eliminar sugerencia"){
        const hijo = e.target;
        const padre = hijo.parentNode.parentNode;
        padre.parentNode.remove(padre);
    }
})

