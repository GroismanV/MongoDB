// 1. Выбрать БД group_220823

use group_220823

// 2. Дропнуть существующую коллекцию users

db.users.drop()

// 3. Создать коллекцию users

db.createCollection('users')

// 4. Напомнить коллекцию users 5 документами со свойствами (_id, firstname, lastname, age, salary, online (true/false))

db.users.insertMany([
  {
    _id: 1,
    firstname: 'Oleg',
    lastname: 'Petrov',
    age: 13,
    online: true,
    salary: 1000
  },
  {
    _id: 2,
    firstname: 'Anna',
    lastname: 'Ivanova',
    age: 34,
    online: false,
    salary: 1500
  },
  {
    _id: 3,
    firstname: 'Irina',
    lastname: 'Sidorova',
    age: 19,
    online: false,
    salary: 500
  },
  {
    _id: 4,
    firstname: 'Inga',
    lastname: 'Ushanova',
    age: 67,
    online: true,
    salary: 890
  },
  {
    _id: 5,
    firstname: 'Petr',
    lastname: 'Sidikov',
    age: 82,
    online: true,
    salary: 750
  }
])


// 5. Проверить содержимое коллекции

db.users.find()


// 6. Вывести всех пользователей в сети

db.users.find({ online: true })

// 7. Вывести всех пользователей которые зарабатывают от 800 до 1300 (вкл)

db.users.find({
  $and: [
    {salary: {$gte: 800}},
    {salary: {$lte: 1300}}
  ]
})

db.users.find({
  salary: {$gte: 800, $lte: 1300}
})

// 8. Вывести всех совершеннолетних (>=18) пользователей, зарабатывающих в диапазоне от 700 до 1500 (вкл) и находящихся в сети

db.users.find({
  $and: [
    {age: {$gte: 18}},
    {salary: {$gte: 700, $lte: 1500}},
    {online: true}
  ]
})

db.users.find({
  age: {$gte: 18},
  salary: {$gte: 700, $lte: 1500},
  online: true
})

// 9. Вывести всех с именами Anna, Irina, Boris, Ivan

db.users.find({ firstname: {$in: ['Anna', 'Irina', 'Boris', 'Ivan']} })


// 10. Удалить пользователя с айди 5

db.users.deleteOne({ _id: 5 })

// 11. Удалить всех несовершеннолетних пользователей в сети

db.users.deleteMany({
  $and: [
    {age: {$lt: 18}},
    {online: true}
  ]
})

db.users.deleteMany({
  age: {$lt: 18},
  online: true
})