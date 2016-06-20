/**
 * Создание модели объекта
 */
var Person = Backbone.Model.extend({

    // Значение инстанса по умолчанию
    defaults: {
        name: 'Dima',
        age: 25,
        job: 'Web Developer'
    },

    // Валидация возраста
    validate: function(attrs) {
        if (attrs.age <= 0) {
            return 'Ошибка при установке значения атрибута age: ожидается положительное число';
        }
    },

    // Метод объекта
    walk: function() {
        return this.get('name') + ' is walking';
    }
});

/**
 * Список людей
 */
var PeopleCollection = Backbone.Collection.extend({
    // передаем инициализирующую модель с которой ассоциируются будущие модели
    model: Person,
});

/**
 * Создаем вид одного человека
 */
var PersonalView = Backbone.View.extend({

    // Срабатывает в момент создания экземпляра класса
    initialize: function() {

    },
    tagName: 'li',

    // Внешний шаблон
    template: _.template($('#personal-id').html()),

    // Наполнение документа HTML кодом
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

/**
 * Вид списка людей
 */
var PeopleView = Backbone.View.extend({
    tagName: 'ul',
    className: 'people-list',
    initialize: function() {

    },
    render: function () {
        this.collection.each(function(person) {
            var personView = new PersonalView({model: person});
            this.$el.append(personView.el);
        }, this);

        return this;
    }
});

// Такое приходит с сервера
var people = [
    {
        name: 'Петр',
        age: 27,
        job: 'Менеджер',
    },
    {
        name: 'Игорь',
        age: 22,
        job: 'Продавец',
    },
    {
        name: 'Альберт',
        job: 'Кассир',
    },
];

var person = new Person;

// Заполняем коллекцию массивом объектов
var peopleCollection = new PeopleCollection(people);

// Передаем коллекцию peopleCollection в вид списка людей PeopleView
var peopleView = new PeopleView({collection: peopleCollection});

$(document.body).append(peopleView.render().el);
