db.workers.insertMany([
    {
        _id: 1,
        firstname: 'Inga',
        lastname: 'Petrova',
        age: 27,
        position: 'Barista',
        salary: 1500,
        skills: ['preparing drinks', 'cleaning equipment']
    },
    {
        _id: 2,
        firstname: 'Boris',
        lastname: 'Orlov',
        age: 36,
        position: 'Server',
        salary: 2400,
        skills: ['taking orders', 'suggesting meals', 'taking payments']
    },
    {
        _id: 3,
        firstname: 'Ivan',
        lastname: 'Demidov',
        age: 32,
        position: 'Chef',
        salary: 3200,
        skills: ['preparing food', 'baking bread']
    },
    {
        _id: 4,
        firstname: 'Marina',
        lastname: 'Sidorov',
        age: 22,
        position: 'Hostess',
        salary: 1700,
        skills: ['greeting guests', 'seating guests', 'answering phone calls']
    },
    {
        _id: 5,
        firstname: 'Olga',
        lastname: 'Ivanova',
        age: 43,
        position: 'Sommelier',
        salary: 2500,
        skills: ['curating a wine list', 'creating wine pairings']
    }
])

// 4. Работнику с id 3 увеличить зарплату на 400
db.workers.updateOne(
    { _id: 3 },
    { $inc: { salary: 400 } })

// 5. Работникам с id 1 и 2 изменить зарплату на 1800

db.workers.updateMany(
    { _id: { $in: [1, 2] } },
    { $set: { salary: 1800 } }
)

// 6. Всем работникам в массив skills добавить навык 'attending group meetings’
db.workers.updateMany(
    {},
    { $addToSet: { skills: 'attending group meetings' } }
)


// 7. Работникам Boris и Marina добавить в skills ‘working with CRM-system’ и ‘preparing for a concert’
db.workers.updateMany(
    { firstname: { $in: ['Boris', 'Marina'] } },
    { $push: { skills: { $each: ['working with CRM - system', 'preparing for a concert'] } } }
)

// 8. Добавить всем работникам свойство gender со значением ‘not defined’
db.workers.updateMany(
    {},
    { $set: { gender: 'not defined' } }
)

// 9. Работникам Inga, Marina и Olga установить в свойстве gender значение female
db.workers.updateMany(
    { firstname: { $in: ['Inga', 'Marina', 'Olga'] } },
    { $set: { gender: 'female' } }
)

// 10. Работникам Boris и Ivan установить в свойстве gender значение male
db.workers.updateMany(
    { firstname: { $in: ['Boris', 'Ivan'] } },
    { $set: { gender: 'male' } }
)

// 12. Найти сколько зарабатывают мужчины и женщины => ({_id: 'male', total_salary: XXX}, {_id: 'female', total_salary: XXX}). Выводить группы в порядке возрастания значения в свойстве total_salary

//1 вариант
db.workers.aggregate(
    [
        { $group: { _id: '$gender', total_salary: { $sum: '$salary' } } },
        { $sort: { total_salary: 1 } }
    ]
)
//2 вариант

db.workers.aggregate([
    { $group: { _id: '$gender', total_salary: { $sum: '$salary' } } }
]).sort({ total_salary: 1 })

// 13. Найти средний возраст мужчин и женщин  => ({_id: 'male', avg_age: XXX}, {_id: 'female', avg_age: XXX})
db.workers.aggregate(
    [
        { $group: { _id: '$gender', avg_age: { $avg: '$age' } } }
    ]
)
// 14. Найти самую большую зарплату среди мужчин и женщин => ({_id: 'male', max_salary: XXX}, {_id: 'female', max_salary: XXX})
db.workers.aggregate(
    [
        { $group: { _id: '$gender', max_salary: { $max: '$salary' } } }
    ]
)