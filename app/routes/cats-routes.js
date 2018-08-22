// подключаем библиотеку для обработки запросов
bodyParser = require('body-parser').json();
// главная функция обработки зарпосов для котов (вызывается из index.js)
module.exports = function (app, fs) {
    // описываем реакцию на пост-запрос
    // формальные параметры - url, на который реагирует данная функция
    // объект-обработчик тела запроса, который конвертирует тело запроса в удобный JSON-формат
    // и непосредственно функция обработки запроса, принимающая на вход запрос и ответ
    app.post('/cats', bodyParser, function (request, response) {
              // вытаскиваем из запроса тело и помещаем в переменную body
              var body = request.body;
              // выводим тело в консоль
              console.log(body);
              // кладем данные из тела запроса в файл
              fs.appendFile('data.txt', body.name + ' ' + body.photo + '\n');
              // говорим что ответом на запрос будет страница с формой для отправки
              response.redirect('/html/photos.html');
    });
    // описываем реакция на гет-запрос
    // поскольку здесь мы от клиента никаких данных не получаем то обработчик тела запроса не нужен
    app.get('/cats', function (request, response) {
        // считываем данные из файла с помощью функции readFile
        // формальными параметрами функции являются имя файла, кодировка, функция которая срабатывает при успешном открытии файла
        fs.readFile('data.txt', 'utf-8', function (err, data) {
            // разбиваем данные из файла по строкам
            var lines = data.split('\n');
            // создаем JSON-массив куда будем класть данные из файла
            var jsonResult = [];
            // бегаем по всем строкам
            for (var i = 0; i < lines.length - 1; i++) {
                // кладем запись о текущем коте в массив
                jsonResult.push({'name' : lines[i].split(' ')[0], 'photo' : lines[i].split(' ')[1]});
            }
            response.setHeader('Content-Type', 'application/json');
            console.log(JSON.stringify(jsonResult));
            response.send(JSON.stringify(jsonResult));
        })
    })

};