async function getCatalog(){
    let api = await fetch ('http://api.katalog.ru/catalog');
    let catalog = await api.json();

    document.querySelector('.list').innerHTML = '';
    document.querySelector('#cont').innerHTML = '';    

    console.log(catalog);

    catalog.forEach((cata) => {
        document.querySelector('.list').innerHTML +=`
        <div class="card">
                <a class="avtor">${cata.authors}</a>
                <h1 class="name" onclick="getBook(${cata.idbook})">${cata.name}</h1>
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
            </div>
        </div>`
}


async function getGenres(){
    let res = await fetch ('http://api.katalog.ru/catalog/genres');
    let genres = await res.json();

    console.log(genres);

    document.querySelector('#buttshanr').innerHTML = '';
    document.querySelector('#cont').innerHTML = '';
console.log(genres);
    document.querySelector('#buttshanr').innerHTML += `
    <button  class="butclas" onclick="getCatalog()">Всё</button>`;

    genres.forEach((genre) => {
        document.querySelector('#buttshanr').innerHTML +=`
        <button class="butclas" onclick="getByGenre(${genre.IDgenre})" >${genre.genre}</button>`
    });
}
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

async function goAdmin(){
    $login = document.getElementById('login').value;
    $password = document.getElementById('password').value;

    if($login === 'julia' && $password === '1111'){
        window.location.assign("./adminindex.html");
    } else{
        alert("Не верные данные!");
    }

}

getGenres()
getCatalog()

