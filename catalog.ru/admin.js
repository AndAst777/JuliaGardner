async function getCatalog(){
    let api = await fetch ('http://api.katalog.ru/catalog');
    let catalog = await api.json();
    document.querySelector('.list').innerHTML = '';
    document.querySelector('#cont').innerHTML = '';
    document.getElementById('form-container').style.display = 'none';

    catalog.forEach((cata) => {
        document.querySelector('.list').innerHTML +=`
        <div class="card">
                <h1 class="name" onclick="getBook(${cata.idbook})">${cata.name}</h1>
                <a class="avtor">${cata.authors}</a>
                <img src="uploads/${cata.avatar}" id="img">
               
            </div>`
    });
}

async function getBook(idB){
    let cata = await fetch (`http://api.katalog.ru/catalog/book/${idB}`);
    let catalog = await cata.json();
    document.querySelector('.list').innerHTML = '';
    document.querySelector('#cont').innerHTML = '';
    document.querySelector('#cont').innerHTML += `
<div id="card-one-book">
        <h2 class="type1">${catalog.name}</h2>
        <p class="type" id="author">${catalog.authors}</p>
            
                <img src="uploads/${catalog.avatar}" class="imggg" id="bookimg">
            <div id="full_discription">
                <p class="type">Жанр: <span>${catalog.genres}</span></p>
                <p class="type">Номер выбранной книги: <span>${idB}</span></p>
                <p class="type">Дата релиза: <span>${catalog.year}</span></p>
                <h3 class="type1">Описание</h3>
                <p class="type" id="anno">${catalog.infbook}</p>
                <button class="ref11"  type="submit" onclick="upForm(${idB})"><img src="photo/ref.png" class="ref1"></button>
                <button class="delle11" type="submit" onclick="delCat(${idB})" class="del"><img src="photo/delet.png" class="delle1"></button>
            </div>
        </div>`
}

async function upForm(id){
    let cata = await fetch (`http://api.katalog.ru/catalog/book/${id}`);
    let catalog = await cata.json();

    document.getElementById('form-container').style.display = 'flex'
    document.querySelector('#form-container').innerHTML += `
        <div><img src="photo/myu.png" class="bot"> </div>
        <div id='form'>
            <h3 class="newdata">Введите новые данные:</h3>
            <input class="em" id="name" value="${catalog.name}" placeholder="Название книги"></br>
            <input class="em" id="autor" value="${catalog.authors}" placeholder="Авторы: "></br>
            <input class="em" id="year" value="${catalog.year}" placeholder="Год"></br>
            <input class="em" id="infbook" value="${catalog.infbook}" placeholder="Описание"></br>
            <input class="em" id="genre" value="${catalog.genres}" placeholder="Жанры: "></br>
            <input class="em" type="file" id="ava"></br>
            <button class="er" id="done_button" onclick="updateBook(${id})">Подтвердить</button>
        </div>
        
    `;
}

async function updateBook(id){
    let name = document.getElementById('name').value;
    let autor = document.getElementById('autor').value;
    let year = document.getElementById('year').value;
    let infbook = document.getElementById('infbook').value;
    let genre = document.getElementById('genre').value;
    let ava = document.getElementById('ava').files[0];

    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('autors', autor);
    formdata.append('year', year);
    formdata.append('infbook', infbook);
    formdata.append('genres', genre);
    formdata.append('ava', ava);

    let res = await fetch(`http://api.katalog.ru/catalog/book/${id}`, {
        method: 'POST',
        body: formdata
    });

    let data = await res.json();

    if(data.status === true){
        await getBook(id);
        document.getElementById('form-container').style.display = 'none';
        document.querySelector('#form').remove();
    }
}

async function getGenres(){
    let res = await fetch ('http://api.katalog.ru/catalog/genres');
    let genres = await res.json();
    document.querySelector('#buttshanr').innerHTML = '';
    document.querySelector('#cont').innerHTML = '';
    document.querySelector('#buttshanr').innerHTML += `
    <button class="butclas" onclick="getCatalog()">Всё</button>`;

    genres.forEach((genre) => {
        document.querySelector('#buttshanr').innerHTML +=`
        <button class="butclas" onclick="getByGenre(${genre.IDgenre})" >${genre.genre}</button>`
    });
}
//поиск по жанрам
//поиск по жанрам
async function getByGenre(id) {

    let res = await fetch(`http://api.katalog.ru/catalog/genres/${id}`);
    let books = await res.json();
    document.querySelector('.list').innerHTML = '';
    document.querySelector('#cont').innerHTML = '';

    console.log(books);

    books.forEach((book) => {

        document.querySelector('.list').innerHTML += `
        <div class="card">
  
                <h1 class="name" onclick="getBook(${book.idbook})">${book.name}</h1>
                <a class="avtor">${book.authors}</a>
                <img src="uploads/${book.avatar}" id="img">
               
            </div>`
    });
}
//поиск авторов и книг
async function search(){
    let result = document.getElementById('search').value.toLowerCase();

    let Res = await fetch ('http://api.katalog.ru/catalog');
    let books = await Res.json();

    document.querySelector('.list').innerHTML = '';
    document.querySelector('#cont').innerHTML = '';

    books.forEach((book) => {
        let name = book.name.toLowerCase();
        let authors = book.authors.toLowerCase();

        if(name.includes(result) || authors.includes(result)){
            document.querySelector('.list').innerHTML +=`
            <div class="card">
  
                <h1 class="name" onclick="getBook(${book.idbook})">${book.name}</h1>
                <a class="avtor">${book.authors}</a>
                <img src="uploads/${book.avatar}" id="img">
             
            </div>`
        }
    })

    result= 0;
}

async function goForm(){
    window.location.assign("./up.html");
}

async function back(){
    addBook();
    window.location.assign("./adminindex.html");

}
async function addBook(){
    let name = document.getElementById('name').value;
    let autor = document.getElementById('autor').value;
    let year = document.getElementById('year').value;
    let infbook = document.getElementById('infbook').value;
    let genre = document.getElementById('genre').value;
    let ava = document.getElementById('ava').files[0];

    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('autors', autor);
    formdata.append('year', year);
    formdata.append('infbook', infbook);
    formdata.append('genres', genre);
    formdata.append('ava', ava);

    let res = await fetch('http://api.katalog.ru/catalog/book', {
        method: 'POST',
        body: formdata
    });

    let data = await res.json();

    if(data.status === true){

        await getCatalog();

    }
}

async function delCat(id){

    let res = await fetch(`http://api.katalog.ru/catalog/book/${id}`, {
        method: 'DELETE'
    });

    let data = await res.json();

    if(data.status === true){
        await getCatalog();
        document.getElementById('form-container').style.display = 'none';
        document.querySelector('#form').remove();
    }
}

getGenres()
getCatalog()

