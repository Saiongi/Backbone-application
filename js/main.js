// Замыкание
(function() {

    // Пространство имен для приложения
    window.App = {
        Collections : {},
        Models : {},
        Views : {},
        Helpers: {}
    };

    // Хелпер шаблона
    App.Helpers.template = function(id) {
        return _.template($('#' + id).html());
    }

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
    App.Models.Person = Backbone.Model.extend({

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
    App.Collections.People = Backbone.Collection.extend({
        // передаем инициализирующую модель с которой ассоциируются будущие модели
        model: App.Models.Person,
    });

    /**
     * Создаем вид одного человека
     */
    App.Views.Person = Backbone.View.extend({

        // Срабатывает в момент создания экземпляра класса
        initialize: function() {
            // бест-практиз рендер на этапе инициализации
            this.render();
        },
        tagName: 'li',

        // Внешний шаблон
        template: App.Helpers.template('personal-id'),

        // Наполнение документа HTML кодом
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    /**
     * Вид списка людей
     */
    App.Views.People = Backbone.View.extend({
        tagName: 'ul',
        className: 'people-list',
        initialize: function() {

        },
        render: function () {
            this.collection.each(function(person) {
                var personView = new App.Views.Person({model: person});
                this.$el.append(personView.el);
            }, this);

            return this;
        }
    });

    var person = new App.Models.Person;

    // Заполняем коллекцию массивом объектов
    var peopleCollection = new App.Collections.People(people);

    // Передаем коллекцию peopleCollection в вид списка людей PeopleView
    var peopleView = new App.Views.People({collection: peopleCollection});

    $(document.body).append(peopleView.render().el);

}());
