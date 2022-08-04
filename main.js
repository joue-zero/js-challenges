

let ul = document.querySelector('ul');

document.body.style.height = `${window.innerHeight}px`;
// https://api.github.com/repos/joue-zero/js-challenges/topics
fetch('https://api.github.com/repos/joue-zero/js-challenges/contents/')
.then((data) => {return data.json()})
.then((data) => {
    data.forEach(element => {
        if(element.type == 'dir'){
            let content = `
            <li>
                <a target="_blank" href="https://joue-zero.github.io/js-challenges/${element.name}">${element.name}</a>
            </li>
            `;
            ul.insertAdjacentHTML('beforeend', content);
        }
        
    });
}).catch((eror) =>{ul.textContent = "Sorry Its Empty";});

