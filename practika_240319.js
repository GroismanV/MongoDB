// 1. Выбрать БД

use group_220823


// 2.  Удалить коллекцию users

db.users.drop()

// 3. Создать новую коллекцию users, используя массив

db.users.insertMany([
    {
        _id: 1,
        firstname: 'Oleg',
        lastname: 'Ivanov',
        age: 30,
        salary: 1000,
        rating: 4.7
    },
    {
        _id: 2,
        firstname: 'Anna',
        lastname: 'Petrova',
        age: 34,
        salary: 400,
        rating: 2.6
    },
    {
        _id: 3,
        firstname: 'Ivan',
        lastname: 'Sidorov',
        age: 55,
        salary: 1600,
        rating: 4.9
    },
    {
        _id: 4,
        firstname: 'Anna',
        lastname: 'Ushanova',
        age: 39,
        salary: 1300,
        rating: 4.3
    }
])

// 4. Всем пользователям добавить свойство languages со значением []

db.users.updateMany(
    {},
    { $set: { languages: [] } }
)

// 5. Всем пользователям, зарабатывающим более 1000 уе, в массив languages добавить English

db.users.updateMany(
    { salary: { $gt: 1000 } },
    { $push: { languages: 'English' } }
)

// 6. Всем пользователям с рейтингом от 4 до 5 (вкл) и возрастом больше 35 добавить в массив languages - French, Spanish

db.users.updateMany(
    {
        rating: { $gte: 4, $lte: 5 },
        age: { $gt: 35 }
    },
    { $addToSet: { languages: { $each: ['French', 'Spanish'] } } }
)

// 7. Всем пользователям добавить в массив languages French. Если French уже есть в массиве, то не дублировать

db.users.updateMany(
    {},
    { $addToSet: { languages: 'French' } }
)

// 8. Всем пользователям уменьшить значение salary на 100

db.users.updateMany(
    {},
    { $inc: { salary: -100 } }
)

// 9. Всем пользователям переименовать свойство rating в rate

db.users.updateMany(
    {},
    { $rename: { 'rating': 'rate' } }
)

// 10. У всех документов удалить свойство rate

db.users.updateMany(
    {},
    { $unset: { rate: '' } }
)
