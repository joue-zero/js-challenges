

let input = document.querySelector('input'),
    button = document.querySelector('button'),
    repoContent = document.querySelector('.content-container');


    button.onclick = function () {
        if(input.value != ""){
            let ajax = new XMLHttpRequest();
            ajax.open("GET", `https://api.github.com/users/${input.value}/repos`);
            ajax.send();
            // console.log(ajax);
            ajax.onreadystatechange = function() {
                if(ajax.readyState == 4){
                    if(ajax.status == 200){
                        repoContent.textContent = "";
                        handelComponent(JSON.parse(ajax.responseText));
                    } else {
                        repoContent.textContent = "";
                        repoContent.innerHTML =`<p class="no">No Such User</p>`; 
                    }
                } 
            }
        } 
    }

function handelComponent(repos){
    if(repos.length === 0){
        repoContent.innerHTML = "Empty Content";
    }
    repos.forEach((repo) => {
        let repoBox = document.createElement('div');
        repoBox.classList.add('repo-box');

        let title = document.createElement('p');
        title.className = 'title';
        title.textContent = repo.name;

        let option = document.createElement('div');
        option.className = "option";

        let stars = document.createElement('span');
        stars.className = "star";
        stars.textContent = `Stars ${repo.stargazers_count}`

        let link = document.createElement('a');
        link.textContent = "Visit";
        link.href = repo.svn_url;
        link.target = "_blank";

        option.appendChild(stars);
        option.appendChild(link);

        repoBox.appendChild(title);
        repoBox.appendChild(option);
        
        repoContent.appendChild(repoBox);
    })
}