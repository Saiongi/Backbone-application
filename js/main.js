/**
 * Создание модели объекта
 */
var Person = Backbone.Model.extend({

    /**
     * Значения по инстанса по умолчанию
     */
    defaults: {
        name: 'Dima',
        age: 25,
        job: 'Web Developer'
    },

    /**
     * Валидация возраста
     */
    validate: function(attrs) {
        if (attrs.age <= 0) {
            return 'Ошибка при установке значения атрибута age: ожидается мнж. чисел R.';
        }
    },

    /**
     * Метод объекта
     */
    walk: function() {
        return this.get('name') + ' is walking';
    }
});

/**
 * Переопределяем стандартные параметры
 */
var q = new Person({
    'name': 'Nikolay',
    'age': 27
});

/**
 * Слушаем возниконовение ошибки. Выводим текст ошибки.
 */
q.on('invalid', function(model, error) {
    console.log(error);
});

// Изменяем возраст объекта
q.set('age', -28, {
    validate: true
});

// Получаем имя объекта
q.get('name');

// Получаем JSON представление
q.toJSON();

/**
 * Создаем вид
 */
var PersonalView = Backbone.View.extend({

    /**
     * Срабатывает в момент создания экземпляра класса
     */
    initialize: function() {
        // Выведем модель данного вида
        console.log(this.model);
    },
    tagName: 'li',
    className: 'person',
    id: 'some-persone',

    /**
     * Наполнение документа HTML кодом
     */
    render: function() {
        // Антипаттерн, так проектировать не нужно
        this.$el.html(this.model.get('name') + ': ' + this.model.get('job') + ', ' + this.model.get('age') + ' лет');
    }
});

var v = new PersonalView();

// Обращаемся к DOM элементу
v.el;

// Обращаемся к объекту jQuery
v.$el;

var ePerson = new Person;

// Связываем вид и модель
var ePersonView = new PersonalView({
    model: ePerson
});

// Вызываем метод который запишет во внутрь вида имя модели
ePersonView.render();
