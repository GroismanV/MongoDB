// Пагинации и сортировка

// .limit(2)
// .skip(1)

// .sort({name: 1})
// .sort({name: -1})

// .slice: limit
// .slice: [skip, limit]

// Проекция

// .find(..., {name: 1, _id: 0})


db.restaurants.insertMany([
    {
      "name": "Restaurant 1",
      "cuisine": "Italian",
      "location": "New York",
      "menu": [
        { "name": "Pizza Margherita", "price": 12 },
        { "name": "Spaghetti Carbonara", "price": 15 },
        { "name": "Tiramisu", "price": 8 }
      ]
    },
    {
      "name": "Restaurant 2",
      "cuisine": "Mexican",
      "location": "Los Angeles",
      "menu": [
        { "name": "Tacos", "price": 10 },
        { "name": "Burritos", "price": 12 },
        { "name": "Guacamole", "price": 6 }
      ]
    },
    {
      "name": "Restaurant 3",
      "cuisine": "Japanese",
      "location": "Tokyo",
      "menu": [
        { "name": "Sushi", "price": 20 },
        { "name": "Ramen", "price": 15 },
        { "name": "Matcha Ice Cream", "price": 7 }
      ]
    }
  ])

//  Вывести рестораны, где цены меню выше 10 долларов.

db.restaurants.find({'menu.price': {$gt: 10}})

// Вывести рестораны, где цены меню не выше 6 долларов

db.restaurants.find({'menu.price': {$lte: 6}})

// Получить первые два ресторана.

db.restaurants.find().limit(2)

// Получить рестораны, пропустив первый, и орграничить выборку двумя ресторанами:

db.restaurants.find().skip(1).limit(2)

// Вывести рестораны с кухней "italian" и отсортировать их названия(name) по алф. порядку

db.restaurants.find({cuisine: 'Italian'}).sort({name: 1})

// Получить рестораны, где цены меню выше 10 долларов, и отсортировать их по названию в обратном порядке

db.restaurants.find({'menu.price': {$gt: 10}}).sort({name: -1})

// Получить рестораны с кухней "Japanese" и вернуть только их названия и расположение, отсортированные по расположению в алфавитном порядке:

db.restaurants.find({cuisine: 'Japanese'}, {name: 1, location: 1, _id: 0}).sort({location: 1})

// Получить рестораны, где в меню есть блюда дороже 15 долларов, и вернуть только их названия, расположение и самое дорогое блюдо:

db.restaurants.find({'menu.price': {$gt: 15}}, {name: 1, location: 1, menu: {$slice: 1},  _id:0})

// Получить рестораны с кухней "Italian" и отобразить только их названия(name), а также названия блюд в меню(menu.name), отсортированные(name) по алфавиту

db.restaurants.find({cuisine: 'Italian'}, {name: 1, 'menu.name': 1, _id: 0}).sort({name: 1})

// Получить рестораны с кухней "Italian" и вернуть только их названия и первые два блюда из меню

db.restaurants.find({cuisine: 'Italian'}, {name: 1, _id: 0, menu: {$slice: 2}})



// Обновление данных 

db.users.insertMany([
    {
        _id: 1,
        firstname: 'Анатолий',
        lastname: 'Ушанов',
        age: 28,
        gender: 'm'
    },
    {
        _id: 2,
        firstname: 'Светлана',
        lastname: 'Демидова',
        age: 25,
        gender: 'f'
    },
    {
        _id: 3,
        firstname: 'Никита',
        lastname: 'Иванов',
        age: 3,
        gender: 'm'
    },
    {
        _id: 4,
        firstname: 'Ольга',
        lastname: 'Петрова',
        age: 22,
        gender: 'f'
    }
])

// replaceOne
// Если нам нужно полностью заменить один документ другим, используем replaceOne.

// replaceOne(filter, update, options)
// replaceOne(filter, update, upsert: true/false)
// Если true: то mongodb будет обновлять документ, если он найден, и созвадавть новый, если такого докумнета нет.
// Если false: не будет созвадавть новый документ, если запрос на выборку не найдет ни одного документа

db.users.replaceOne({firstname: 'Никита'}, {firstname: 'Никита', lastname: 'Петров', age: 20, gender: 'm'})

db.users.replaceOne({firstname: 'Никита'}, {firstname: 'Никита', lastname: 'Иванов'})

// updateOne/updateMany

// Чтобы не обновлять весь документ, а только значение одного или нескольких свойств используем updateOne/updateMany. Если нужно обновить только один документ(первый по выборке) используем updateOne, если несколько документов(все по выборке), то используем updateMany

// $set - если нужно обновить отдельное поле, или если обновляемого поля нет, то оно создается

db.users.updateOne({firstname: 'Ольга', lastname: 'Петрова'}, {$set: {lastname: 'Иванова'}})

// Добавили новое поле salary 
db.users.updateOne({firstname: 'Ольга', lastname: 'Иванова'}, {$set: {salary: 2000}})


// $inc - для увеличения значения числового поля на определенное кол/во единиц, если обновляемого поля нет, то оно создается

db.users.updateOne({firstname: 'Ольга', lastname: 'Иванова'}, {$inc: {age: 1}})

db.users.updateOne({firstname: 'Ольга', lastname: 'Иванова'}, {$inc: {age: -1}})

db.users.updateOne({firstname: 'Никита', lastname: 'Иванов'}, {$inc: {age: 20}})

db.users.updateOne({firstname: 'Ольга', lastname: 'Иванова'}, {$set: {lastname: 'Петрова', salary: 2500, age: 30}})

// Пользователям которым больше 25 присвоить поле salary со значением 3000
db.users.updateMany({age: {$gt: 25}}, {$set: {salary: 3000}})

// Добавить поле is_admin со значением false для всех пользователей
db.users.updateMany({}, {$set: {is_admin: 'false'}})

// $unset - для удаления поля

db.users.updateOne({firstname: 'Ольга'}, {$unset: {salary: 1}})
db.users.updateOne({firstname: 'Ольга'}, {$unset: {age: 1, is_admin: 1}})

db.users.updateMany({}, {$unset: {is_admin: 1}})


// Обновление массивов

// $push - добавить значение в массив 
db.workers.updateOne({firstname: 'Ivan'}, {$push: {skills: 'playing games'}})
db.workers.updateMany({}, {$push: {skills: 'writing JS code'}})

// $each - можно добавить сразу несколько значений в массив
db.workers.updateMany({}, {$push: {skills: {$each: ['writing Java code', 'team working']}}})

// $addToSet - Отличие от push в том, что addToSet добавляет данные, если их еще нет в массиве(через push данные дублируются)
db.workers.updateMany({}, {$addToSet: {skills: {$each: ['writing Java code', 'team working']}}})

// $pop - позволяет удалить один эл. из массива либо первый, либо последний
// если значение 1 то удалет последний эл., если -1, то первый
db.workers.updateMany({}, {$pop: {skills: 1}})
db.workers.updateMany({}, {$pop: {skills: -1}})

// $pull - удаляет каждое вхождение эл. в массив (можно удалить только одно значение)
db.workers.updateMany({}, {$pull: {skills: 'writing Java code'}})

// $pullAll - удаляет несколько значений из массива
db.workers.updateOne({firstname: 'Olga'}, {$pullAll: {skills: ['writing JS code', 'team working']}})