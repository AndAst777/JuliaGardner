<?php 

$connect = mysqli_connect('localhost', 'root', '', 'books2');

function getAuthors($book_id) {
    global $connect;
    $authors = array();

    $res = mysqli_query($connect, "SELECT * FROM books_authors LEFT JOIN `autors` ON books_authors.autor_id=autors.IDAvtor WHERE katalog_id='$book_id'");

    if (mysqli_num_rows($res) > 0) {

        while ($arr = mysqli_fetch_assoc($res)) {

            $tmp = array();
            $tmp['IDavtor'] = $arr['IDavtor'];
            $tmp['Nameautors'] = $arr['Nameautors'];

            $authors[] = $tmp;
        }
    }

    // print_r($authors);
    return $authors;
}

function getGenres($book_id) {
    global $connect;
    $genres = array();

    $res = mysqli_query($connect, "SELECT * FROM books_genres LEFT JOIN `genre` ON books_genres.genre_id=genre.IDgenre WHERE katalog_id='$book_id'");

    if (mysqli_num_rows($res) > 0) {

        while ($arr = mysqli_fetch_assoc($res)) {

            $tmp = array();
            $tmp['IDgenre'] = $arr['IDgenre'];
            $tmp['genre'] = $arr['genre'];

            $genres[] = $tmp;
        }
    }

    // print_r($genres);
    return $genres;
}

function convertArr($arr, $key) {
    $res = array();

    foreach ($arr as $item) {
        $res[] = $item[$key];
    }

    return $res;
}

function getCatalog() {
    global $connect;
    $catalog = mysqli_query($connect, "SELECT * FROM `katalog`");

    $books = array();

    if (mysqli_num_rows($catalog) > 0) {

        while ($arr = mysqli_fetch_assoc($catalog)) {
            # echo '<pre>';
            $id = $arr['idbook'];
            $authors = getAuthors($id);
            $genres = getGenres($id);
            # echo '</pre><br><br>';

            $book = $arr;
            $book['authors'] = implode(', ', convertArr($authors, 'Nameautors'));
            $book['genres'] = implode(', ', convertArr($genres, 'genre'));

            $books[] = $book;
        }
    }

    echo json_encode($books);
}

function getBook($id) {
    global $connect;
    $catalog = mysqli_query($connect, "SELECT * FROM `katalog` WHERE idbook='$id'");

    if (mysqli_num_rows($catalog) > 0) {
        $arr = mysqli_fetch_assoc($catalog);

        # echo '<pre>';
        $id = $arr['idbook'];
        $authors = getAuthors($id);
        $genres = getGenres($id);
        # echo '</pre><br><br>';

        $book = $arr;
        $book['authors'] = implode(', ', convertArr($authors, 'Nameautors'));
        $book['genres'] = implode(', ', convertArr($genres, 'genre'));

        echo json_encode($book);
        return $book;
    } else {
        http_response_code(404);
        $res = ["status" => false, "message" => "Book not found"];
        echo json_encode($res);
    }
}

function getByGenre($genre_id) {
    global $connect;
    $res = mysqli_query($connect, "SELECT * FROM `books_genres` LEFT JOIN `katalog` ON katalog_id=katalog.idbook WHERE genre_id='$genre_id'");

    $books = array();

    if (mysqli_num_rows($res) > 0) {
        while ($arr = mysqli_fetch_assoc($res)) {
            # print_r($arr);

            $id = $arr['idbook'];
            $authors = getAuthors($id);
            $genres = getGenres($id);

            $book = $arr;
            $book['authors'] = implode(', ', convertArr($authors, 'Nameautors'));
            $book['genres'] = implode(', ', convertArr($genres, 'genre'));
            $books[] = $book;
        }
    }

    echo json_encode($books);
}

function getGenresList() {
    global $connect;
    $genres = mysqli_query($connect, "SELECT IDgenre, genre FROM genre");
    $list = [];
    while ($genre = mysqli_fetch_assoc($genres)){
        $list[] = $genre;
    }
    echo json_encode($list);
}

function addAuthor($author) {
    global $connect;

    $res = mysqli_query($connect, "SELECT `IDavtor` FROM `Autors` WHERE `nameautors`='$author'");
    $autArr = mysqli_fetch_assoc($res);
    $authorID = $autArr['IDavtor'];

    if (!isset($authorID)) {
        mysqli_query($connect, "INSERT INTO `Autors` (`nameautors`) VALUES ('$author')");
        $authorID = mysqli_insert_id($connect);
    }

    return $authorID;
}

function addGenre($genre) {
    global $connect;

    # print_r($genre);

    $res = mysqli_query($connect, "SELECT `IDgenre` FROM `genre` WHERE `genre`='$genre'");
    $genreArr = mysqli_fetch_assoc($res);
    $genreID = $genreArr['IDgenre'];

    if (!isset($genreID)) {
        mysqli_query($connect, "INSERT INTO `genre` (`genre`) VALUES ('$genre')");
        $genreID = mysqli_insert_id($connect);
    }

    return $genreID;
}

function addBook($base, $file) {
    global $connect;

    $exts = pathinfo($file['ava']['name'], PATHINFO_EXTENSION);
    $filename = uniqid().".".$exts;
    move_uploaded_file($file['ava']['tmp_name'], "../catalog.ru/uploads/".$filename);

    $name = $base['name'];
    $inbook = $base['infbook'];
    $year = $base['year'];
    $autors_str = $base['autors'];
    $genres_str = $base['genres'];

    $genres = explode(',', $genres_str);
    $authors = explode(',', $autors_str);

    mysqli_query($connect, "INSERT INTO `katalog` (`name`, `avatar`, `infbook`, `year`) VALUES ('$name', '$filename', '$inbook', '$year')");
    $book_id = mysqli_insert_id($connect);

    foreach ($genres as $genre) {
        $genre_id = addGenre(trim($genre));
        mysqli_query($connect, "INSERT INTO `books_genres`(`katalog_id`, `genre_id`) VALUES('$book_id', '$genre_id')");
    }

    foreach ($authors as $author) {
        $author_id = addAuthor(trim($author));
        mysqli_query($connect, "INSERT INTO `books_authors`(`katalog_id`, `autor_id`) VALUES('$book_id', '$author_id')");
    }

    $res = [
        "status"=>true,
        "id_book" =>$book_id
    ];
    echo json_encode($res);
}

function upBook($id, $base, $files) {
    global $connect;

    $img = $files['ava'];
    $name = $base['name'];
    $year = $base['year'];
    $inbook = $base['infbook'];

    $autors_str = $base['autors'];
    $genres_str = $base['genres'];

    $genres = explode(',', $genres_str);
    $authors = explode(',', $autors_str);

    if ($name != null) {
        mysqli_query($connect, "UPDATE katalog SET name = '$name' WHERE idBook = '$id'");
    }
    if ($img != null){
        $exts = pathinfo($img['name'], PATHINFO_EXTENSION);
        $filename = uniqid().".".$exts;
        move_uploaded_file($img['tmp_name'], "../catalog.ru/uploads/".$filename);
        mysqli_query($connect, "UPDATE katalog SET avatar = '$filename' WHERE idBook = '$id'");
    }
    if($year != null){
        mysqli_query($connect, "UPDATE katalog SET year = '$year' WHERE idBook = '$id'");
    }
    if($inbook != null){
        mysqli_query($connect, "UPDATE katalog SET infbook = '$inbook' WHERE idBook = '$id'");
    }

    mysqli_query($connect, "DELETE FROM `books_genres` WHERE katalog_id='$id'");
    mysqli_query($connect, "DELETE FROM `books_authors` WHERE katalog_id='$id'");

    foreach ($genres as $genre) {
        $genre_id = addGenre(trim($genre));
        mysqli_query($connect, "INSERT INTO `books_genres`(`katalog_id`, `genre_id`) VALUES('$id', '$genre_id')");
    }

    foreach ($authors as $author) {
        $author_id = addAuthor(trim($author));
        mysqli_query($connect, "INSERT INTO `books_authors`(`katalog_id`, `autor_id`) VALUES('$id', '$author_id')");
    }

    $res = [
        "status" => true,
        "message" => "Обновлено"
    ];
    echo json_encode($res);
}

function delBook($id) {
    global $connect;

    mysqli_query($connect, "DELETE FROM books_authors WHERE katalog_id = '$id'");
    mysqli_query($connect, "DELETE FROM books_genres  WHERE katalog_id = '$id'");
    mysqli_query($connect, "DELETE FROM katalog WHERE idbook='$id'");

    http_response_code(200);

    $res = [
        "status" => true,
        "message" => "Удалено"
    ];
    echo json_encode($res);
}


?>