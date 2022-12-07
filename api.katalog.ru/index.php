<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

# require 'connect.php';
require 'fc.php';

$method = $_SERVER['REQUEST_METHOD'];
$g= $_GET['q'];
$param=explode('/', $g);
$type=$param[0];

if(isset($param[1])){
    $ye=$param[1];
    $id=$param[2];

}

if($method === 'GET'){
    if ($type='catalog'){
        if ($ye === 'book') {getBook($id);}
        elseif($ye === 'genres'){
            if(isset($id)){ getByGenre($id);
            } else {
                getGenresList(); 
            }
        } elseif($ye === 'autor'){
            // getByAuthor($id);
        }

        else{ getCatalog();}
    }

}

elseif ($method === 'POST'){
    if ($type === 'catalog'){

        if(isset($ye)) {
            if ($ye === 'book') {
                if(isset($id)){
                    upBook($id, $_POST, $_FILES);
                } else{ addBook($_POST, $_FILES);}

            }}}
}
elseif($method === 'DELETE'){
    if($type === 'catalog'){
        if(isset($ye)){
            if($ye === 'book'){
                if(isset($id)){
                    delBook($id);
                }
            }
        }
    }
}