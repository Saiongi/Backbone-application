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
            return 'Ошибка при установке значения атрибута age: ожидается мнж. чисел R.';
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
 * Создаем вид
 */
var PersonalView = Backbone.View.extend({

    // Срабатывает в момент создания экземпляра класса
    initialize: function() {
        // Выведем модель данного вида
        console.log(this.model);
    },
    tagName: 'li',

    // Внешний шаблон
    template: _.template($('#personal-id').html()),

    // Наполнение документа HTML кодом
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
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

// Заполняем коллекцию массивом объектов
var peopleCollection = new PeopleCollection(people);

// Возьмем Игоря
var m = peopleCollection.at(1);

// Сделаем его студентом
m.set('job','студент');
