// Объявляем четыре константы, каждая из констант
// содержит модуль из определенной библиотеки

// для отдачи статики
// просим библиотеку экспресс
const express = require('express');

const fileUpload = require('express-fileupload');
// создаем экземпляр объекта
const app = express();
// просим библиотеку для работы с файлами
const fs = require('fs');
// для обработки тела post-запросов
const bodyParser = require('body-parser');
// подключаем его к модулю express
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());
// говорим, что раздаем папку public
app.use(express.static('public'));
require('./app/routes')(app, fs);
app.listen(8080);
console.log("Server started at 8080");