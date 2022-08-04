
// My Varibels

let option = document.getElementById('option'),
    search = document.getElementById('name'),
    button = document.querySelector('[type="button"]'),
    content = document.querySelector('.content');

    
button.addEventListener('click', function() {

    if(search.value !== ""){
        let promise = getValues(option.value, search.value);
        promise.then((data) => {return JSON.parse(data)})
        .then(
            (data) => {
                document.querySelectorAll('.con-box').forEach(ele => {
                    ele.remove();
                })
                data.forEach((con) => {
                    let x = `
                    <div class="con-box">
                    <img src="${con.flags["png"]}" class ="flag all" />
                    <div class="cont">
                    <h3 class="name all">${con.name.common}</h3>
                    </div>
                    </div>
                    `;
                    content.insertAdjacentHTML('beforeend', x);
                })
                showFilterOption();
            }
        )
        .catch((eror) => console.log(eror));
    } else {
        alert('Enter Content');
    }
});

function getValues(key, value){
    let promise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", `https://restcountries.com/v3.1/${key}/${value}`);
        request.onload = function () {
            if(request.status === 200){
                resolve(request.responseText);
            }else {
                reject(Error(`In Valid ${key}`));
            }
        }
        request.send();
    })
    
    return promise;
}

// Show Filterd Option

function showFilterOption() {
    document.querySelector(".options").style.opacity = 1;
    let options = document.querySelectorAll(".options ul li");

    options.forEach((ele) => {
        
        ele.onclick = function () {
            options.forEach(e => {
                e.classList.remove('active'); 
                document.querySelectorAll(`.${e.dataset.show}`).forEach(o => {
                    o.style.display = "none";
                    
                })
            })
            ele.classList.add('active');
            document.querySelectorAll(`.${ele.dataset.show}`).forEach(ele => {
                ele.style.display = "block";
            })
        }
        
    })

}
// showFilterOption();