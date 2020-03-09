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
            console.log(obj)
            console.log(obj.images.fixed_width.url)
            const url = obj.images.fixed_width.url
            const width = obj.images.fixed_width.width
            const height = obj.images.fixed_width.height
            const title = obj.title
            resultsHTML += `<div class="tendencia"> <img src="${url}" width="${width} alt="${title}" height="${height}"><p>#hashtag</p></div>`
        })

        resultsEl.innerHTML = resultsHTML
    }).catch(function(err){
        console.log(err.message)
    })
}

// Menu sugerencia de resultados de busqueda

const menu_busqueda = document.querySelector('#busqueda');
searchInput.addEventListener("click", ()=>{
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

