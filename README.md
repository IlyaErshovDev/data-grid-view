# Remark:
На данный момент в приложении реализованы все основные функции из ТЗ: сортировка по столбцам, фильтрация, клиентская пагинация, добавление новых записей, вывод подробной информации в блок при клике на элемент.

# Техническое задание

Необходимо разработать React-приложение для отображения таблицы с данными.

__Функциональность__

- Сортировка по столбцам: при нажатии на название столбца строки таблицы сортируются по возрастанию, при повторном клике &mdash; по убыванию. Графическим элементом или текстовым сообщением указывается направление сортировки.
- Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов на страницу. Необходимо предоставить пользовательскую навигацию для перехода по страницам.
- Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется по нажатию на кнопку "Найти".
- По клике на строку таблицы значения полей выводятся в дополнительном блоке под таблицей.
- Данные в таблицу загружаются с сервера. Способ загрузки с сервера на ваш выбор.
- Над таблицей присутсвует кнопка __добавить__, по нажатии на которую выпадает форма добавления ряда
	+------+------------+-----------------+-----------------+---------------+
	| id   | firstName  | lastName        | email           | phone         |
	+------+------------+-----------------+-----------------+---------------+
	|input | input      | input           | input           | input         |
	+------+------------+-----------------+-----------------+---------------+
- После заполнения всех инпутов активируется кнопка __Добавить в таблицу__ которая вставляет заполненный ряд в начало таблицы
  

Для демонстрации работы компонента необходимо сделать простую HTML страницу.
Пользователю предлагается выбрать набор данных: маленький или большой.
При выборе набора данных он загружается с сервера и по данным строится таблица.

__Формат данных от сервера__

Сервер возвращает JSON-массив данных.
Пример данных: 
```js
[
	{
		id: 101,
		firstName: 'Sue',
		lastName: 'Corson',
		email: 'DWhalley@in.gov',
		phone: '(612)211-6296',
		address: {
			streetAddress: '9792 Mattis Ct',
			city: 'Waukesha',
			state: 'WI',
			zip: '22178'
		},
		description: 'et lacus magna dolor...',
	}
}
```

Маленький объем данных берется по ссылке
http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}

Большой объем данных берется по ссылке
http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}

__Замечания__

- Особое внимание следует уделить скорости работы. Зависание интерфейса при выполнении операций загрузки данных, фильтрации, сортировки недопустимо.
- Во время загрузки данных стоит показать какой-то индикатор
- Использование сторонних библиотек будет плюсом только в случае если это оправданно и вы сможете объяснить причину выбора. Показав свои знания в грамотном применении сторонних готовых решений, вы имеете шанс повысить свою профессиональную привлекательность для нас.
- Пишите код так, как бы вы его писали в работе &mdash; внутренности задания будут оцениваться даже тщательней, чем внешнее соответствие заданию. Код должен быть организован так, чтобы его можно было заново использовать.
- Помните про обработку ошибок!
- Верстка может быть самая простая. Визуализацию и украшение делайте на ваш вкус. Мы не против использования [Bootstrap](http://getbootstrap.com/) или похожего UI фреймворк, но только для UI представления (нельзя использовать JS код для решения задачи, но можно использовать для оформительских эффектов (анимации и тому подобное))!

__Схема визуального представления данных__

```
+------+------------+-----------------+-----------------+---------------+
| id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
+------+------------+-----------------+-----------------+---------------+
| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
```

Если выделен пользователем с `id = 101`, то под таблицей выводим следующую информацию:

	Выбран пользователь <b>Sue Corson</b>
	Описание:
	<textarea>
	et lacus magna dolor...
	</textarea>
	Адрес проживания: <b>9792 Mattis Ct</b>
	Город: <b>Waukesha</b>
	Провинция/штат: <b>WI</b>
	Индекс: <b>22178</b>

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

