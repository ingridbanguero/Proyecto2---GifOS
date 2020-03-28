const gifsEl = document.getElementById('misgifs');

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