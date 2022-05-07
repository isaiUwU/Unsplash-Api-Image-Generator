const input = document.getElementById('input');
const grid = document.getElementsByClassName('grid')[0];

window.addEventListener('load', dayNightMode())

input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter')
        loadImg();
})

function loadImg() {
    removeImg();

    const url = 'https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=9&client_id=2sy_bg_HUSEuu2jtoPiaFOehPMbPdST28po7jdaDnJk';

    fetch(url)

    .then(response => {
        if(response.ok)
            return response.json();
        else
            alert(response.status)
    })

    .then(data => {
        const imageNodes = [];
        for(i = 0; i < data.results.length;i++){
            imageNodes[i] = document.createElement('div');
            imageNodes[i].className = 'img';
            imageNodes[i].setAttribute = ('title', 'double click to download');
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
            imageNodes[i].addEventListener('dblclick', () => {
                window.open(data.results[i].links.download, '-blank');
            })
            grid.appendChild(imageNodes[i]);
        }
    })
}

function removeImg() {
    grid.innerHTML = ' ';
}

function dayNightMode(){
    const date = new Date();
    const hour = date.getHours();

    if(hour >= 7 && hour <= 19){
        document.body.style.backgroundColor = 'whitesmoke';
        document.body.style.color = 'black';
    }
    else{
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }
}