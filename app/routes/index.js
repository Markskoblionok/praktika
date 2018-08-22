// запрашиваем файл с маршрутами для обработки данных связанных с котами
const catsRoutes = require('./cats-routes');
const uploadRoutes = require('./upload-routes');
// функция которая вызывается из server.js
module.exports = function (app, fs) {
    // передаем исполнение файлу в котором обрабатываются запросы связпанные с кошками
    catsRoutes(app, fs);
    uploadRoutes(app, fs);
}