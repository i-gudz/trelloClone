let mainTitle = document.getElementById('mainTitle')
let modal = document.querySelector('.modal')
let renameTitleBtn = document.querySelector('#renameTitleBtn')
let inputTitle = document.querySelector('#inputTitle')
let arrTitle = 'Title'
mainTitle.addEventListener('click', () => {
    modal.style.display = 'flex'
})
let arrLog = []
let listLog = document.querySelector('#listLog')

const renameTitle = () => {
    if (inputTitle.value.length > 3) {
        modal.style.display = 'none'
        arrTitle = []
        arrTitle.push(inputTitle.value)
        localStorage.removeItem('arrTitle')
        localStorage.setItem("arrTitle", arrTitle)
        mainTitle.textContent = localStorage.getItem('arrTitle')
        let itemLog = document.createElement('p')
        itemLog.innerHTML =`Главное имя было поменяно на ${inputTitle.value}` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
        inputTitle.value = ''
    } else {
        inputTitle.value = 'Минимальное название меньше 3 символов'
    }
}

if (localStorage.getItem('arrTitle') === null) {
    mainTitle.textContent = 'Title'
} else {
    mainTitle.textContent = localStorage.getItem('arrTitle')
}

//юзеры

let arrUsers = [{
        firstName: "Olivia",
        lastName: "Fournier",
        picture: "https://randomuser.me/api/portraits/thumb/women/58.jpg",
    }, {
        firstName: "Florence",
        lastName: "Fontai",
        picture: "https://randomuser.me/api/portraits/thumb/women/54.jpg",
    }, {
        firstName: "Hugo",
        lastName: "Lee",
        picture: "https://randomuser.me/api/portraits/thumb/men/50.jpg",
    }, {
        firstName: "Amorim",
        lastName: "Dias",
        picture: "https://randomuser.me/api/portraits/thumb/men/18.jpg",
    }, {
        firstName: "Niklas",
        lastName: "Arola",
        picture: "https://randomuser.me/api/portraits/thumb/men/42.jpg",
    }

]

let listUsers = document.getElementById('listUsers')
const USER_URL = 'https://randomuser.me/api/'

async function showHero() {
    let response = await fetch(USER_URL)
    let userInfo = await response.json()
    let nameUser = {
        firstName: userInfo.results[0].name.first,
        lastName: userInfo.results[0].name.last,
        picture: userInfo.results[0].picture.thumbnail
    }
    if (arrUsers.length < 10) {
        arrUsers.push(nameUser)
        localStorage.setItem("arrUsers", JSON.stringify(arrUsers))

        let item = document.createElement('li')
        item.classList.add('userInfo')
        item.innerHTML = `<img src='${nameUser.picture}' alt='404'/>
    <span>${nameUser.firstName}</span>
    <span>${nameUser.lastName}</span>
    <button id='delUser'>x</button>`
        listModalUsers.appendChild(item)
        let itemUser = document.createElement('li')
        itemUser.classList.add('user')
        itemUser.innerHTML = `<img src='${nameUser.picture}' alt='404'/>`
        listUsers.appendChild(itemUser)
        let itemLog = document.createElement('p')
        itemLog.innerHTML =`Добавлен пользователь ${nameUser.firstName} ${nameUser.lastName}` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
    }
}




let userList
if ((JSON.parse(localStorage.getItem('arrUsers')) == null) || (JSON.parse(localStorage.getItem('arrUsers')).length == 0)) {
    localStorage.setItem("arrUsers", JSON.stringify(arrUsers))
    userList = arrUsers
} else {
    userList = JSON.parse(localStorage.getItem('arrUsers'))
}

let newArrUsers = JSON.parse(localStorage.getItem('arrUsers'))
let count = 0
for (let i = 0; i < newArrUsers.length; i++) {
    if (newArrUsers[i] === "n") {
        count++
    }
}
newArrUsers.forEach((e, i) => {
    if (newArrUsers[i] === "n") {
        newArrUsers.splice(newArrUsers.indexOf('n'), count)
    }
})
localStorage.setItem("arrUsers", JSON.stringify(newArrUsers))

//рендер иконок на страницу
userList.forEach(element => {
    let item = document.createElement('li')
    item.classList.add('user')
    item.innerHTML = `<img src='${element.picture}' alt='404'/>`
    listUsers.appendChild(item)
});
// рендер информации в модалку про юзеров
let listModalUsers = document.querySelector('#listModalUsers')
let user = document.querySelectorAll('.user')
let modalUsers = document.querySelector('.modalUsers')
user.forEach((e) => {
    e.addEventListener('click', () => {
        modalUsers.style.display = 'flex'
    })
})

userList.forEach(element => {
    let item = document.createElement('li')
    item.classList.add('userInfo')
    item.innerHTML = `<img src='${element.picture}' alt='404'/>
    <span class='first'>${element.firstName}</span>
    <span>${element.lastName}</span>
    <button id='delUser'>x</button>`
    listModalUsers.appendChild(item)
});

let userInfo = document.querySelectorAll('.userInfo')

let delUser = document.querySelectorAll('#delUser')

delUser.forEach((element, i) => {
    element.addEventListener('click', () => {
        userInfo[i].remove()
        user[i].remove()
        let itemLog = document.createElement('p')
        itemLog.innerHTML =`Удалён пользователь ${userInfo[i].innerText}` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
        arrUsers[i] = "n"
        localStorage.setItem("arrUsers", JSON.stringify(arrUsers))
        
    })
})

arrUsers = JSON.parse(localStorage.getItem('arrUsers'))

// localStorage.clear()
//создание новой борды
let addBoard = document.querySelector('#addBoard')
let modalBoard = document.querySelector('.modalBoard')


let arrBoards = [{
    title: 'To do',
    bg: '#333333'
}, {
    title: 'In Progress',
    bg: '#333333'
}, {
    title: 'Done',
    bg: '#333333'
}]


addBoard.addEventListener('click', () => {
    modalBoard.style.display = 'flex'
})

let inputBoard = document.querySelector('#inputBoard')

const nameBoard = () => {
    if (inputBoard.value.length > 3) {
        if (arrBoards.length < 6) {
            let nameBoard = {
                title: inputBoard.value,
                bg: '#333333'
            }
            let status = false
            arrBoards.forEach((e, i) => {
                if (e.title == nameBoard.title) {
                    inputBoard.value = ''
                    status = true
                }
            })
            if (status == true) {
                alert('Такая борда существует')
            } else {
            modal.style.display = 'none'
            arrBoards.push(nameBoard)
            localStorage.setItem("arrBoards", JSON.stringify(arrBoards))
            let itemLog = document.createElement('p')
        itemLog.innerHTML =`Добавлена новая борда ${inputBoard.value}` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
            inputBoard.value = ''
            let item = document.createElement('li')
            item.style.backgroundColor = nameBoard.bg
            item.classList.add('board')
            item.innerHTML = `<h4>${nameBoard.title}</h4>
                        <button id='menuBoard'>menu</button>
                        <button id='deleteBoard'>x</button>
                        <button id='addTask'>Add task</>`
                listBoards.appendChild(item)
                
            }
        } else {
            alert('max boards 6')
        }

    } else {
        inputBoard.value = 'Минимальное название меньше 3 символов'
    }
}



let listBoards = document.querySelector('#listBoards')
let renderList
if ((JSON.parse(localStorage.getItem('arrBoards')) == null) || (JSON.parse(localStorage.getItem('arrBoards')).length == 0)) {
    localStorage.setItem("arrBoards", JSON.stringify(arrBoards))
    renderList = arrBoards
} else {
    renderList = JSON.parse(localStorage.getItem('arrBoards'))
}
renderList.forEach((element, i) => {

    let item = document.createElement('li')
    let delBtn = '<button id="deleteBoard">x</button>'
    item.classList.add('board')
    item.style.backgroundColor = element.bg
    item.innerHTML = `<h4>${element.title}</h4>
    
    <button id='menuBoard'>menu</button>
    
    ${element.title == 'To do'? '': element.title == 'In Progress'? '':element.title == 'Done'?'': delBtn}
    <button id='addTask'>Add task</>`
    listBoards.appendChild(item)
    // ${i<=2? '': delBtn}

});

arrBoards = JSON.parse(localStorage.getItem('arrBoards'))


//смена цвета фона борды
let colorB = document.querySelector('#setColor')

let menuBoard = document.querySelectorAll('#menuBoard')
let modalMenuBoard = document.querySelector('.modalMenuBoard')
let saveColor = document.querySelector('#saveColor')
let board = document.querySelectorAll('.board')
menuBoard.forEach((e, i) => {
    e.addEventListener('click', () => {
        modalMenuBoard.style.display = 'flex'
        saveColor.addEventListener('click', () => {

            arrBoards[i].bg = colorB.value
            board[i].style.backgroundColor = colorB.value
            localStorage.setItem("arrBoards", JSON.stringify(arrBoards))
            let itemLog = document.createElement('p')
        itemLog.innerHTML =`Цвет ${i+1} борды изменён на ${colorB.value}` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
        })
    })

})

// удаление борды
let deleteBoard = document.querySelectorAll('#deleteBoard')

deleteBoard.forEach((e, i) => {
    e.addEventListener('click', () => {
        board[i + 3].remove()
        let itemLog = document.createElement('p')
        itemLog.innerHTML =`Удалена борда` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
        arrBoards.splice(arrBoards.indexOf(arrBoards[i + 3]), 1)
        localStorage.setItem("arrBoards", JSON.stringify(arrBoards))
    })
})

let closeModal = document.querySelectorAll('.closeModal')

closeModal.forEach(e => {
    e.addEventListener('click', () => {
        e.parentNode.style.display = 'none'
        // location.reload()
    })
})

let modalTask = document.querySelector('.modalTask')

let addTasks = document.querySelectorAll('#addTask')
addTasks.forEach(e => {
    e.addEventListener('click', () => {
        modalTask.style.display = 'flex'
    })
})

let arrTasks = []

let arrTags = [
    'red',
    'green',
    'blue',
    'yellow'
]

let setTagColor = document.querySelector('#setTagColor')
let addTag = document.querySelector('#addTag')

addTag.addEventListener('click',()=>{
    if(arrTags.length<10){
        arrTags.push(setTagColor.value)
        localStorage.setItem('arrTags', JSON.stringify(arrTags))
        arrTags = JSON.parse(localStorage.getItem('arrTags'))
        let itemList = document.createElement('li')
        itemList.innerHTML=`<div style="background-color:${setTagColor.value}"></div>
        <button id='delTag'>x</button>`
        listModalTags.appendChild(itemList)
        let itemLog = document.createElement('p')
        itemLog.innerHTML =`Добавлен новый тег` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
    }else{
        alert('max tags 10')
    }
})
let listTag = document.querySelector('#tagTaskNew')
let listModalTags = document.querySelector('#listModalTags')
let btnMenuTags = document.querySelector('#btnMenuTags')
let modalTags = document.querySelector('.modalTags')
btnMenuTags.addEventListener('click', ()=>{
    modalTags.style.display='flex'
})
if (JSON.parse(localStorage.getItem('arrTags')) != null) {
    arrTags = JSON.parse(localStorage.getItem('arrTags'))
}

arrTags.forEach((e, i) => {
    let item = document.createElement('label')
    item.style.backgroundColor = e
    item.setAttribute('for', e)
    item.innerHTML = `
    <input type="checkbox" class="tagNew" id="${e}" onclick="">
    `
    listTag.appendChild(item)
    let itemList = document.createElement('li')
    itemList.innerHTML=`<div style="background-color:${e}"></div>
    <button id='delTag'>x</button>`
    listModalTags.appendChild(itemList)
})



let tag = document.querySelectorAll('.tagNew')
let counTag = 0
let selectTags = []
tag.forEach(e => {
    e.addEventListener('click', () => {
        if (e.checked == true) {
            e.classList.add('active')
            counTag++
            selectTags.push(e.id)
            console.log(selectTags)
        }
        if (e.checked == false) {
            e.classList.remove('active')
            counTag--
            selectTags.splice(selectTags.indexOf(e), 1)
            console.log(selectTags)
        }
        if (counTag > 2) {
            e.checked = false
            counTag--
            selectTags.splice(selectTags.indexOf(e), 1)
            alert('max choose 2 tags')
        }
    })
})
let titleTaskNew = document.querySelector('#titleTaskNew')
let dateTaskNew = document.querySelector('#dateTaskNew')

let userTask = document.querySelector('#userTaskNew')

userList.forEach(e => {
    let item = document.createElement('option')
    item.classList.add('userTaskIcon')
    item.innerHTML = `
    <img src='${e.picture}' alt='404'/>
    ${e.firstName} ${e.lastName}
    `
    userTask.appendChild(item)
})

let descriptionTaskNew = document.querySelector('#descriptionTaskNew')
let createTask = document.querySelector('#createTask')

let numBoard = 0
addTasks.forEach((e, i) => {
    e.addEventListener('click', () => {
        numBoard = i
    })
})
let userTaskIcon = document.querySelectorAll('.userTaskIcon')
createTask.addEventListener('click', () => {
    let taskObj = {
        title: titleTaskNew.value,
        date: dateTaskNew.value,
        tags: selectTags,
        user: [userTask.value, userTaskIcon[userTask.selectedIndex].firstChild.nextSibling.currentSrc],
        description: descriptionTaskNew.value,
        counter: numBoard
    }
    let status = false
    if(taskObj.title == '' || taskObj.date == '' || counTag == 0 || taskObj.user == [] || taskObj.description == ''){
        alert('Вы не заполнили все поля')
    }else{
        arrTasks.push(taskObj)
        localStorage.setItem("arrTasks", JSON.stringify(arrTasks))
        arrTasks = JSON.parse(localStorage.getItem('arrTasks'))
        let item = document.createElement('div')
        item.classList.add('task')
        item.innerHTML = `
            <h3>${taskObj.title}</h3>
            <div class="tagTask" id="${taskObj.tags[0]}" style="background-color: ${taskObj.tags[0]};"></div>
            <div class="tagTask" id="${taskObj.tags[1] == undefined? '':taskObj.tags[1]}" style="background-color: ${taskObj.tags[1] == undefined? '':taskObj.tags[1]};"></div>
            <img src="${taskObj.user[1]}" alt='404'>`
        board[numBoard].appendChild(item)
        let itemLog = document.createElement('p')
        itemLog.innerHTML =`На ${numBoard+1} борду добавлена новая задача` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
    }
})

const setDate = () => {
    let now = new Date()
    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    let datapicker = year + '-' + month + '-'  + day 
    return datapicker
}

if (JSON.parse(localStorage.getItem('arrTasks')) != null) {
    arrTasks = JSON.parse(localStorage.getItem('arrTasks'))
}

arrTasks.forEach((element, i) => {
    let item = document.createElement('div')
    item.classList.add('task')
    item.innerHTML = `
        <h3>${element.title}</h3>

        <div class="tagTask" id="${element.tags[0]}" style="background-color: ${element.tags[0]};"></div>
        <div class="tagTask" id="${element.tags[1] == undefined? '':element.tags[1]}" style="background-color: ${element.tags[1] == undefined? '':element.tags[1]};"></div>
        <img src="${element.user[1]}" alt='404'>`
    board[element.counter].appendChild(item)

});
let modalUserInfo = document.querySelector('.modalUserInfo')
let infoTitle = document.querySelector('#taskInfoTitle')
let infoDate = document.querySelector('#taskInfoDate')
let infoTags = document.querySelector('#taskInfoTags')
let infoUser = document.querySelector('#taskInfoUser')
let infoDescription = document.querySelector('#taskInfoDescription')
let listTasksHtml = document.querySelectorAll('.task')
arrTasks.forEach((e, i) => {
    listTasksHtml[i].addEventListener('click', () => {
        infoTitle.textContent = e.title
        infoDate.textContent = e.date
        infoTags.textContent = e.tags
        let user = document.createElement('div')
        user.innerHTML = `<img src="${e.user[1]}" alt="404">
        <span>${e.user[0]}</span>`
        infoUser.appendChild(user)
        infoDescription.textContent = e.description
        modalUserInfo.style.display = 'flex'
    })
})

let closeModalInfo = document.querySelector('.closeModalInfo')

closeModalInfo.addEventListener('click', () => {
    modalUserInfo.style.display = 'none'
    infoTitle.textContent = ''
    infoDate.textContent = ''
    infoTags.textContent = ''
    infoUser.innerHTML = ''
    infoDescription.textContent = ''
})
let modalSetBgColor = document.querySelector('.modalSetBgColor')
let selectBg = document.querySelector('#selectBg')
selectBg.addEventListener('click', ()=>{
    modalSetBgColor.style.display = 'flex'
})
let body = document.querySelector('body')
let setBgColor = document.querySelector('#setBgColor')
let saveBgColor = document.querySelector('#saveBgColor')
let bodyBackground 
saveBgColor.addEventListener('click', () => {
    body.style.backgroundColor = setBgColor.value
    bodyBackground = setBgColor.value
    localStorage.setItem("bodyBackground", bodyBackground)
    let itemLog = document.createElement('p')
        itemLog.innerHTML =`Цвет страницы изменён на ${setBgColor.value}` 
        arrLog.unshift(itemLog.innerHTML)
        localStorage.setItem('arrLog', JSON.stringify(arrLog))
        arrLog = JSON.parse(localStorage.getItem('arrLog'))
        listLog.prepend(itemLog)
})

body.style.backgroundColor = localStorage.getItem('bodyBackground')

if (JSON.parse(localStorage.getItem('arrLog')) != null) {
    arrLog = JSON.parse(localStorage.getItem('arrLog'))
}

arrLog.forEach((e, i) => {
    let item = document.createElement('p')
    item.innerHTML = `${e}`
    listLog.appendChild(item)
})