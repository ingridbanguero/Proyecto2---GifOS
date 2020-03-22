
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

// Integración con la API por el buscador
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('results')
const tendencias = document.getElementById('tendencias');
let sugerenciaHTML = "";
let historialSug = []; // Este valor se debe guardar en el globalStorage
search('tendency');

//Sugerencias
const historial = document.getElementById('recientes');

searchForm.addEventListener('submit', function(e){
    e.preventDefault()
    q = searchInput.value
    search(q);
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
}

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
        if(q !== "tendency"){
            searchHistory(q);
        }
    }).catch(function(err){
        console.log(err.message)
    })
}

// Menu sugerencia de resultados de busqueda
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
// Etiquetas de busquedas recientes 


// Gifs de seccion Hoy te sugerimos
const sugerencias = document.getElementById('sugerencias');
const imgSug = document.getElementsByClassName('imgSug');
const titleSug = document.getElementsByClassName('titleSug');
let sugeridos = ["Jonathan Van Ness", "Sailor Mercury", "Glitter", "Unicorn and Raibows"];
let i = 0;

async function getSug(){
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
getSug();

// Funcionamiento botones "Ver Mas..."
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
// Cerrar menu de sugerencias y de temas
window.addEventListener('click', ()=>{
    menu_busqueda.classList.remove('active');
    subTemas.classList.remove('active');
})
