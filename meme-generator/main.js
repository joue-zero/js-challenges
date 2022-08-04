
let topI = document.querySelector('input.top'),
    bottomI = document.querySelector('input.bottom'),
    button = document.querySelector('button'),
    img = document.querySelector('.meme-image');

topI.addEventListener('keyup', (e) => {
    putInput(e.composedPath()[0]);
});


bottomI.addEventListener('keyup', (e) => {
    putInput(e.composedPath()[0]);
});

function putInput(e){
    document.querySelector(`p.${e.getAttribute('class')}`).textContent = e.value;
}

// Fetch The Meme Api
let arr = [];
fetch('https://api.imgflip.com/get_memes').then((re) => {
    return re.json();
}).then((full) => { arr = full.data.memes});



// console.log(console.log(arr));

button.onclick = function () {
    let num = Math.floor(Math.random() * arr.length);
    img.src = arr[num].url;
    
}


