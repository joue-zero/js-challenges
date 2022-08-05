
const MIN = 80;
let qCount = 0;
let contentContainer = document.querySelector('.content-container');
// Get The Data

(function connect() {
    fetch("../data/lang1.json")
    .then((data) => {
        return data.json();
    }).then((data) => {
        allDataHandel(data);
    })
    .catch((er) => {console.log(er)});
})();

function allDataHandel([data]){
    qCount = data.questions.length;
    /*
    ================ Heading Part ===============
    */
    document.getElementById('cat-name').textContent  = data.category;
    document.getElementById('cat-count').textContent = data.questions.length;

    /*
    ================= Body       ================
    */
        // Component
    contentComponent(data.questions);
        // Active Class Options
    optionsActiveClass()

    /*
    ================= Footer     ================
    */
    // Show the Controles 
    controlesComponent(data.questions); // Show Controles
    controlesNavigate();

    // ---------------
    handlingSumbitButton(data.questions);
}


function contentComponent(question){
    let d = new Date;
    let i=0;
    question.forEach((q, index) => {
        
        let content = document.createElement("div");
        content.classList.add("content", `question-${index+1}`);
        if(!index){content.style.display = `block`;}
        else {
            content.style.display = `none`;
        }
        let span = document.createElement('span');
        span.classList.add('number');
        span.textContent = `${index + 1} / ${qCount}`;
        content.appendChild(span);

        let h2 = document.createElement("h2");
        h2.className = `ques-name`;
        h2.textContent = `${q.title}`;
        content.appendChild(h2);

        let options = document.createElement("div");
        options.className = `options`;

        let ul = document.createElement("ul");
        for(let j = 1; j <=4; ++j) {
            let li = document.createElement("li");
            let input = document.createElement("input");
            input.type = "radio";
            input.id = `q-${d.getTime()+index}-${++i}`;
            input.name = `q-${index}`;
            let label = document.createElement("label");
            label.setAttribute('for', `q-${d.getTime()+index}-${i}`);
            label.textContent = q[`answer_${j}`];
            li.appendChild(input);
            li.appendChild(label);
            ul.appendChild(li);
        }
        options.appendChild(ul);
        content.appendChild(options);
        contentContainer.appendChild(content);
    })
    // Show Heading 
}

function optionsActiveClass() {
    let allControles = document.querySelectorAll('.options ul');
    allControles.forEach(option => {
        Array.from(option.children).forEach(li=> {
            li.onclick = function (e) {
                handelActive(e.target.parentElement.parentElement);
            }
        })
    })
}

function controlesComponent(questions){
    questions.forEach((element, index) => {
        let ul = document.querySelector('.controles ul'),
            li = document.createElement('li');
        li.dataset.target = `question-${index + 1}`;
        ul.appendChild(li);
        if(!index){
            li.classList.add('active');
        }
    });
}
function handelActive(p){
    
    p = Array.from(p.children); 
    p.forEach((ele) => {
    ele.onclick = function () {
        p.forEach(li => {li.classList.remove('active');})
        ele.classList.add('active');
    }})
    
}
function controlesNavigate() {
    document.querySelectorAll('.controles ul li').forEach((li,i, arr) => {
        li.addEventListener('click', function () {
            arr.forEach(ele => {ele.classList.remove('active');})
            li.classList.add('active');
            // console.log(document.querySelector(`.${li.dataset.target}`));
            let option = document.querySelector(`.${li.dataset.target}`);
            Array.from(option.parentElement.children).forEach((op) => {
                op.style.display = "none";
            })
            option.style.display = "block";

            // Able The Button when all checked
            let allCheckedInputs = document.querySelectorAll('.options ul li input');
            allCheckedInputs.forEach(input => {
                input.addEventListener('change', function() {
                    if(qCount === document.querySelectorAll('.options ul li input:checked').length){
                        document.getElementById('submit').className = "active";
                    }
                })
            })
        });
    })
}

// Handling Submit Button 
function handlingSumbitButton(questions) {
    let button = document.getElementById('submit');
    let queCount = questions.length;
    button.addEventListener('click', function () {
        let allCheckedInputs = document.querySelectorAll('.options ul li input:checked');
        if(queCount == allCheckedInputs.length){
            let wrong =0, right =0;
            allCheckedInputs.forEach((input, i, arr) => {
                // console.log(input, input.name[2]);
                let curentLabel = input.nextElementSibling.textContent;
                if (curentLabel == questions[i].right_answer){
                    right++;
                    input.parentElement.style.backgroundColor = "#000";
                }else {
                    wrong++;
                    input.parentElement.style.backgroundColor = "#f44336";
                    input.parentElement.style.color = "#fff";
                }
            })
            document.body.style.overflowY = "hidden";
            document.querySelector('.pop-up').style.display = "block";
            document.querySelector('.overlay').style.display = "block";
            window.scrollTo({
                top: 0,
                left:0,
                behavior: 'smooth'
            });
            if((right / queCount)*100 >= MIN){
                congratesBy(right, queCount);
            } else {
                failers(wrong, queCount);
            }
            
        }
    })
}

function congratesBy(right, queCount){
    let mess = document.querySelector('.message .mess');
    mess.textContent = "Congrates! You Passed"
    let from = document.querySelector('.message .from');
    from.textContent = `[${right}]`;
    let to = document.querySelector('.message .to');
    to.textContent = ` [${queCount}]`;
    let perc = document.querySelector('.message .perc');
    perc.innerHTML = `[ ${((right/queCount)*100).toFixed(2)} %]`;
}

function failers(wrong, queCount){
    let mess = document.querySelector('.message .mess');
    mess.textContent = "Sorry! Not Enough"
    let from = document.querySelector('.message .from');
    from.textContent = `[${queCount - wrong}]`;
    from.style.color = "#f00";
    let to = document.querySelector('.message .to');
    to.textContent = ` [${queCount}]`;
    let perc = document.querySelector('.message .perc');
    perc.innerHTML = `[ ${100 - ((wrong/queCount)*100).toFixed(2)} %]`;
}


// Pop up
document.querySelector('.show-answer').onclick = function () {
    document.querySelector('.pop').remove();
    document.body.style.overflowY = "scroll";
    document.querySelector('#submit').remove();
}

document.querySelector('.try-again').onclick = function () {
    window.location.reload();
}