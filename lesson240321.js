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

//   20. Добавить новый навык "communication" для сотрудников из отдела "Marketing"
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