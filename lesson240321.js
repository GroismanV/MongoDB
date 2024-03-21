// 1. Создать коллекцию employees и заполнить её данными о сотрудниках.
// 2. Используя команду insertMany, добавить следующие документы в коллекцию employees:

db.employees.insertMany([
    {
        "name": "Alice",
        "age": 30,
        "department": "HR",
        "skills": ["communication", "organization"],
        "projects": ["Project A", "Project B"]
    },
    {
        "name": "Bob",
        "age": 35,
        "department": "IT",
        "skills": ["programming", "problem-solving"],
        "projects": ["Project C", "Project D"]
    },
    {
        "name": "Charlie",
        "age": 30,
        "department": "Finance",
        "skills": ["financial analysis", "budgeting"],
        "projects": ["Project E"]
    },
    {
        "name": "John",
        "age": 18,
        "department": "IT",
        "skills": ["teamwork", "organization"],
        "projects": ["Project A", "Project D"]
    },
    {
        "name": "Lily",
        "age": 35,
        "department": "IT",
        "skills": ["programming", "problem-solving"],
        "projects": ["Project C", "Project E"]
    },
    {
        "name": "Lucas",
        "age": 30,
        "department": "Finance",
        "skills": ["financial analysis", "budgeting", "problem-solving"],
        "projects": ["Project E", "Project A"]
    },
    {
        "name": "Van",
        "age": 30,
        "department": "Finance",
        "skills": ["teamwork", "organization", "financial analysis"],
        "projects": ["Project E", "Project D"]
    },
    {
        "name": "Laura",
        "age": 31,
        "department": "IT",
        "skills": ["programming", "problem-solving"],
        "projects": ["Project A"]
    },
    {
        "name": "Maria",
        "age": 28,
        "department": "HR",
        "skills": ["communication", "organization", "problem-solving"],
        "projects": ["Project A", "Project D"]
    }
])

// 12. Удалить навык "organization" у всех сотрудников в отделе "HR"
db.employees.updateMany(
    { "department": "HR" },
    { $pull: { skills: "organization" } }
)

// 13. Удалить проекты "Project D" и "Project G" у всех сотрудников

db.employees.updateMany(
    {},
    { $pullAll: { projects: ['Project D', 'Project G'] } }
)


// 14. Добавить новые навыки "creativity" и 'UI design' для сотрудника "Maria"
db.employees.updateOne({ name: 'Maria' }, { $addToSet: { skills: { $each: ['creativity', 'UI design'] } } })

// 15. Удалить все проекты у сотрудников в отделе "Finance"
db.employees.updateMany(
    { department: "Finance" },
    { $set: { projects: [] } }
)

// 16. Добавить новый проект "Project H" для всех сотрудников

db.employees.updateMany(
    {},
    { $addToSet: { projects: 'Project H' } }
)

// 17. Увеличить возраст сотрудника "Van" на 3 года

db.employees.updateOne(
    { "name": "Van" },
    { $inc: { age: 3 } }
)

// 18. Удалить навык "problem-solving" у всех сотрудников в отделе "IT"
db.employees.updateMany(
    { department: "IT" },
    { $pull: { skills: "problem-solving" } }
)

// 19. Удалить проект "Project A" у всех сотрудников
db.employees.updateMany(
    {},
    { $pull: { projects: "Project A" } }
)

// 20. Добавить новый навык "communication" для сотрудников из отдела "Marketing"
db.employees.updateMany(
    { department: 'Marketing' },
    { $addToSet: { skills: 'communicaton' } }
)



// Найти общее кол/во документов в коллекции
db.employees.countDocuments()

// Найти кол/во работников отдела Finance (2 варианта)
db.employees.countDocuments({ department: 'Finance' })
db.employees.find({ department: 'Finance' }).count()

// Найти кол/во работников отдела Finance пропуская первого
db.employees.find({ department: 'Finance' }).skip(1).count()

db.employees.find({ department: 'Finance' }).skip(1).count(true)
// true - по умолчанию count не работает с skip и limit, чтобы разрешить работать с ними count передаем true

// Вывести список всех депараментов(только уникальные значения)
db.employees.distinct('department')

// Найти всех сотрудников с возрастом от 25 до 35 лет
db.employees.find({ age: { $gte: 25, $lte: 35 } })

// Найти всех сотрудников в отделах "HR" или "Finance".
db.employees.find({ department: { $in: ["HR", "Finance"] } })

// Найти всех сотрудников, чей отдел не "IT".
db.employees.find({ department: { $not: "IT" } })

// $eq - = equal
// $ne - != not equal
// $gt - > greater then
// $lt - < less then
// $lte - <= less than/equal
// $gte - >= greater than/equal
// $in - проверка IN со списком



// Вывести только имена сотрудников из отдела "HR"
db.employees.find(
    { department: 'HR' },
    { _id: 0, name: 1 }
)

// Найти всех сотрудников, чьи навыки включают "programming", сортированных по возрасту по убыванию

db.employees.find(
    { "skills": "programming" },
    {}
).sort({ age: -1 })

// Найти всех сотрудников из отдела "IT", ограничив результаты двумя записями и отсортировав их по возрасту по возрастанию.

db.employees.find(
    { department: "IT" },
    {}
).sort({ age: 1 }).limit(2)

// Вывести только имена и навыки всех сотрудников


db.employees.find(
    {},
    { _id: 0, name: 1, skills: 1 }
)

// aggregate()
// $sum - найти сумму поля
// $avg - найти среднее значение поля
// $min - найти минимальное значение поля
// $max - найти максимальное значение поля
// $project - выбырает указанные поля из коллекции
// $match - выполняет фильтрацию
// $group - группировка, агрегирование
// $sort - сортирует документ
// $skip - пропустить документы
// $limit - ограничить кол/во дукументов


// https://github.com/annykh/GenTech-220823/blob/main/Main%20Lesson%20-%2029.02.js
// и добавить следующие 3
db.workers.insertMany([
    {
        _id: 6,
        firstname: 'Inga',
        lastname: 'Petrova',
        age: 45,
        position: 'IT programmer',
        salary: 7500,
        skills: ['Java', 'Python']
    },
    {
        _id: 7,
        firstname: 'Boris',
        lastname: 'Ivanov',
        age: 36,
        position: 'Server',
        salary: 6400,
        skills: ['taking payments']
    },

    {
        _id: 8,
        firstname: 'Inga',
        lastname: 'Ivanova',
        age: 36,
        position: 'Sommelier',
        salary: 2500,
        skills: ['curating a wine list', 'creating wine pairings']
    }
])

// Вывести имя и зарплату всех сотрудников с зарплатой выше 2000 и сортировать по возрастанию зарплаты:
db.workers.aggregate(
    [
        { $match: { salary: { $gt: 2000 } } },
        { $project: { _id: 0, firstname: 1, salary: 1 } },
        { $sort: { salary: 1 } }
    ]
)
// Найти сотудника с максимальной зарплатой, вывести только имя и зарплату.
db.workers.aggregate(
    [
        { $project: { _id: 0, firstname: 1, salary: 1 } },
        { $sort: { salary: -1 } },
        { $limit: 1 }
    ]
)


// Найти сумму зарплат всех сотрудников.
db.workers.aggregate(
    [
        { $group: { _id: null, total_sum: { $sum: '$salary' } } }
    ]
)

// Найти сумму зарплат сотрудников сгруппировать по имени:
db.workers.aggregate(
    [
        { $group: { _id: '$firstname', total_sum: { $sum: '$salary' } } }
    ]
)

// Найти сумму зарплат сотрудников, сгруппировать по имени, сортитовать по убыванию суммы:
db.workers.aggregate(
    [
        { $group: { _id: '$firstname', total_salary: { $sum: '$salary' } } },
        { $sort: { total_salary: -1 } }
    ]
)


// Найти сумму зарплат сотрудников с именем Инга:
db.workers.aggregate(
    [
        { $match: { firstname: 'Inga' } },
        { $group: { _id: '$firstname', total_salary: { $sum: '$salary' } } }
    ]
)
// Найти среднее значение поля salary:
db.workers.aggregate(
    [
        { $group: { _id: null, avg_salary: { $avg: '$salary' } } }
    ]
)


// создать новую коллекцию 
db.employees1.insertMany([
    {
        "firstname": "John",
        "lastname": "Doe",
        "age": 35,
        "salary": 5000,
        "department": "HR",
        "position": "Manager"
    },
    {
        "firstname": "Jane",
        "lastname": "Smith",
        "age": 28,
        "salary": 4000,
        "department": "IT",
        "position": "Developer"
    },
    {
        "firstname": "Alice",
        "lastname": "Johnson",
        "age": 42,
        "salary": 6000,
        "department": "Finance",
        "position": "Accountant"
    },
    {
        "firstname": "Michael",
        "lastname": "Brown",
        "age": 30,
        "salary": 5500,
        "department": "Marketing",
        "position": "Marketing Specialist"
    },
    {
        "firstname": "Emily",
        "lastname": "Davis",
        "age": 33,
        "salary": 5200,
        "department": "Sales",
        "position": "Sales Manager"
    },
    {
        "firstname": "David",
        "lastname": "Wilson",
        "age": 38,
        "salary": 5800,
        "department": "Operations",
        "position": "Operations Director"
    },
    {
        "firstname": "Emma",
        "lastname": "Miller",
        "age": 45,
        "salary": 6200,
        "department": "HR",
        "position": "HR Director"
    },
    {
        "firstname": "Andrew",
        "lastname": "Taylor",
        "age": 40,
        "salary": 5900,
        "department": "IT",
        "position": "IT Director"
    }
])
// Найти среднюю зарплату среди сотрудников в отделе IT.

db.employees1.aggregate(
    [
    { $match: { department: 'IT' } },
    { $group: { _id: null, avg_salary: { $avg: '$salary' } } }
    ]
)

// Найти средний возраст сотрудников в каждом департаменте.
db.employees1.aggregate(
    [
    { $group: { _id: '$department', avg_age: { $avg: '$age' } } }
    ]
)

// Найти средний возраст среди сотрудников с зарплатой выше 5500.

db.employees1.aggregate(
    [
    { $match: { salary: { $gt: 5500 } } },
    { $group: { _id: null, avg_age: { $avg: '$age' } } }
    ]
)
