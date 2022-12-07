-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 07 2022 г., 00:46
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `book`
--

-- --------------------------------------------------------

--
-- Структура таблицы `autors`
--

CREATE TABLE `autors` (
  `IDavtor` int NOT NULL,
  `Nameautors` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `autors`
--

INSERT INTO `autors` (`IDavtor`, `Nameautors`) VALUES
(34, 'Джордж Оруэлл'),
(47, 'Анна Потий'),
(48, 'Кейт Хаск'),
(49, ''),
(50, 'Стейси Ли'),
(51, 'Филип Пулман'),
(52, 'Роберт Стивенсон'),
(53, 'Тейлор Дженкинс Рейд');

-- --------------------------------------------------------

--
-- Структура таблицы `books_authors`
--

CREATE TABLE `books_authors` (
  `id` int NOT NULL,
  `katalog_id` int NOT NULL,
  `autor_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `books_authors`
--

INSERT INTO `books_authors` (`id`, `katalog_id`, `autor_id`) VALUES
(27, 51, 47),
(28, 51, 48),
(29, 56, 51),
(31, 57, 51),
(32, 57, 52);

-- --------------------------------------------------------

--
-- Структура таблицы `books_genres`
--

CREATE TABLE `books_genres` (
  `id` int NOT NULL,
  `katalog_id` int NOT NULL,
  `genre_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `books_genres`
--

INSERT INTO `books_genres` (`id`, `katalog_id`, `genre_id`) VALUES
(43, 51, 9),
(44, 56, 10),
(46, 57, 13);

-- --------------------------------------------------------

--
-- Структура таблицы `genre`
--

CREATE TABLE `genre` (
  `IDgenre` int NOT NULL,
  `genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `genre`
--

INSERT INTO `genre` (`IDgenre`, `genre`) VALUES
(9, 'Любовные романы'),
(10, 'Детские книги'),
(13, 'Приключение'),
(16, '');

-- --------------------------------------------------------

--
-- Структура таблицы `katalog`
--

CREATE TABLE `katalog` (
  `idbook` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(1350) NOT NULL,
  `infbook` varchar(355) NOT NULL,
  `year` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `katalog`
--

INSERT INTO `katalog` (`idbook`, `name`, `avatar`, `infbook`, `year`) VALUES
(51, 'Жива, потому что люблю', '638fb48a85ff1.jpg', 'Письма, написанные от руки — это что-то особенное, жаль, что они изживают свой век. О, это ожидание, томление, о, этот сладостный миг, когда долгожданное письмо приходит', '2020'),
(56, 'Северное сияние', '638fb4f55de4d.jpg', 'Девочка отправляется на поиски своего друга, и в этом путешествии ей открываются тайны о собственной семье и о судьбе', '2022'),
(57, 'Рубин во мгле', '638fb646290ca.jpg', 'Салли остается одна. Она в опасности, хоть и не подозревает об этом. И теперь ее жизнь зависит теперь от разгадки мрачной тайны.', '2018');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `autors`
--
ALTER TABLE `autors`
  ADD PRIMARY KEY (`IDavtor`);

--
-- Индексы таблицы `books_authors`
--
ALTER TABLE `books_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor_id` (`autor_id`),
  ADD KEY `katalog_id` (`katalog_id`);

--
-- Индексы таблицы `books_genres`
--
ALTER TABLE `books_genres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `katalog_id` (`katalog_id`);

--
-- Индексы таблицы `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`IDgenre`);

--
-- Индексы таблицы `katalog`
--
ALTER TABLE `katalog`
  ADD PRIMARY KEY (`idbook`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `autors`
--
ALTER TABLE `autors`
  MODIFY `IDavtor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT для таблицы `books_authors`
--
ALTER TABLE `books_authors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `books_genres`
--
ALTER TABLE `books_genres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT для таблицы `genre`
--
ALTER TABLE `genre`
  MODIFY `IDgenre` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `katalog`
--
ALTER TABLE `katalog`
  MODIFY `idbook` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `books_authors`
--
ALTER TABLE `books_authors`
  ADD CONSTRAINT `books_authors_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `autors` (`IDavtor`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `books_authors_ibfk_2` FOREIGN KEY (`katalog_id`) REFERENCES `katalog` (`idbook`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `books_genres`
--
ALTER TABLE `books_genres`
  ADD CONSTRAINT `books_genres_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`IDgenre`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `books_genres_ibfk_2` FOREIGN KEY (`katalog_id`) REFERENCES `katalog` (`idbook`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
