// Integración con la API por el buscador
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('results')
const tendencias = document.getElementById('tendencias');
let sugerenciaHTML = "";

 
// Este valor se debe guardar en el localStorage
search('Trending');

searchForm.addEventListener('submit', function(e){
    e.preventDefault()
    q = searchInput.value
    search(q);
})

// Barra, historial busquedas recientes
const historial = document.getElementById('recientes');
let historialGuardado = localStorage.getItem('historial')
let historialSug = [];
historialSug = JSON.parse(historialGuardado);
historialSug.forEach(element =>{
    sugerenciaHTML = `<button>#${element}</button>`
    historial.innerHTML += sugerenciaHTML;
})

function searchHistory(q){
    historialSug.unshift(q);
    console.log(historialSug);
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
            // console.log(obj.images.fixed_width.url)
            const url = obj.images.fixed_width.url
            const title = obj.title
            let tag = '';
            // console.log(title);
            let arrayTitle = title.split(" ");
            for (let i=0; i<=3; i++){
                if (arrayTitle[i] !== "GIF" && arrayTitle[i] !== "by" && arrayTitle[i] !== undefined){
                    arrayTitle[i] = arrayTitle[i];
                    tag += '#' + arrayTitle[i] + " "
                }
            } 
            // console.log(arrayTitle);
            // console.log(tag);
            resultsHTML += `<div class="tendencia"> <img src="${url}" alt="${title}"><p>${tag}</p></div>`
        })
        tendencias.innerHTML = q;
        resultsEl.innerHTML = resultsHTML
        if(q !== "Trending"){
            searchHistory(q);
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

/* async function getSug(){
    for (element of sugeridos){
        const apiKey = '60j6blu7K1BahTceUDM7FC8TRZ6QwbkF';
        const path = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${element}&limit=12`
        const resp = await fetch(path);
        const datos = await resp.json();
        const url = datos.data[0].images.fixed_width.url
        const title = element.title;
        imgSug[i].setAttribute("src", `${url}`);
        imgSug[i].setAttribute("alt", `${title}`);
        titleSug[i].innerHTML = `#${element}`
        i++;
    }
}
getSug(); */

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

