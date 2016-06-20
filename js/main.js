// Пространство имен для приложения
var Person = {
    Collection : {},
    Model : {},
    View : {}
};

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

/**
 * Создание модели объекта
 */
Person.Model.Item = Backbone.Model.extend({

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
Person.Collection.Items = Backbone.Collection.extend({
    // передаем инициализирующую модель с которой ассоциируются будущие модели
    model: Person.Model.Item,
});

/**
 * Создаем вид одного человека
 */
Person.View.Item = Backbone.View.extend({

    // Срабатывает в момент создания экземпляра класса
    initialize: function() {
        // бест-практиз рендер на этапе инициализации
        this.render();
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
Person.View.Items = Backbone.View.extend({
    tagName: 'ul',
    className: 'people-list',
    initialize: function() {

    },
    render: function () {
        this.collection.each(function(person) {
            var personView = new Person.View.Item({model: person});
            this.$el.append(personView.el);
        }, this);

        return this;
    }
});

var person = new Person.Model.Item;

// Заполняем коллекцию массивом объектов
var peopleCollection = new Person.Collection.Items(people);

// Передаем коллекцию peopleCollection в вид списка людей PeopleView
var peopleView = new Person.View.Items({collection: peopleCollection});

$(document.body).append(peopleView.render().el);
