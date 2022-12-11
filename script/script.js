// Variáveis
const inputTask = document.querySelector("#task");

const btnAdd = document.querySelector("#btn-add");
const btnCheck = document.querySelectorAll('.fa-square-check');
const btnDel = document.querySelector('.fa-square-minus');

const divTodo = document.querySelector("#todo");
const todoUl = document.querySelector("#todo ul");

let talks = JSON.parse(localStorage.getItem("todo")) || [];

// Funções
function clearInput() {
    inputTask.value = "";
}

function list() {
    
    talks.map((item) => {
        const inputTaskValue = inputTask.value;

        const divNewLi = document.createElement('div');
        divNewLi.classList.add('new-li');
    
        const liElement = document.createElement('li');
        liElement.innerText = item;
    
        const divIcons = document.createElement('div');
        divIcons.classList.add('icons');
    
        const iconCheck = document.createElement('i');
        iconCheck.classList.add('fa-square-check')
        iconCheck.classList.add('fa-solid')
    
        const iconDel = document.createElement('i');
        iconDel.classList.add('fa-square-minus')
        iconDel.classList.add('fa-solid')
        
    
        divIcons.appendChild(iconCheck);
        divIcons.appendChild(iconDel);
    
        divNewLi.appendChild(liElement);
        divNewLi.appendChild(divIcons);
    
        todoUl.appendChild(divNewLi);
    });
};

function saveData() {
    localStorage.setItem('todo', JSON.stringify(talks))
}

// Init list
list();

// Eventos
btnAdd.addEventListener('click', () => {
    const inputTaskValue = inputTask.value;
    todoUl.innerHTML = "";

    talks.push(inputTaskValue);

    list();

    clearInput();

    saveData();
});

document.addEventListener('click', (e) => {
    const elementClick = e.target;
    const elementDiv = elementClick.closest('div');

    if(elementClick.classList.contains('fa-square-check')) {
        const liNew = elementDiv.parentElement;
        const liText = liNew.children;

        liText[0].classList.toggle('check');
        return;
    }

    if(elementClick.classList.contains('fa-square-minus')) {
        const liNew = elementDiv.parentElement;
        const liText = liNew.children;

        const position = talks.indexOf(liText[0].innerText);
        talks.splice(position, 1)

        todoUl.innerHTML = "";
        list();
        saveData();
    }
});