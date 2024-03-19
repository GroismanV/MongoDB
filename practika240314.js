Сегодня


1. Создать коллекцию employees и заполнить её данными о сотрудниках.
2. Используя команду insertMany, добавить следующие документы в коллекцию employees:

[
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
]

//3. Увеличить возраст сотрудника "Alice" на 1 год

db.employees.updateOne({ name: 'Alice' }, { $inc: { age: 1 } })

//4. Установить новый отдел(department) для сотрудника "Bob" на "Marketing"

db.employees.updateOne({ name: "Bob" }, { $set: { department: "Marketing" } })

// Удалить навык "financial analysis" у сотрудника "Charlie":

db.employees.updateOne({ name: "Charlie" }, { $pull: { skills: "financial analysis" } })
// альтернатива для 2 элементов
db.employees.updateOne({ name: "Charlie" }, { $pop: { skills: -1 } })

// 6. Добавить новый проект "Project F" для всех сотрудников
db.employees.updateMany({}, { $push: { projects: 'Project F' } })

//7. Увеличить возраст всем сотрудникам на 3 года
db.employees.updateMany({}, { $inc: { age: 3 } })

// 8. Установить новый отдел "Operations" для всех сотрудников младше 30 лет
db.employees.updateMany({ age: { $lt: 30 } }, { $set: { department: "Operations" } })

// 9. Добавить новый навык "leadership" для сотрудников из отдела "HR"
db.employees.updateMany({ department: "HR" }, { $addToSet: { skills: "leadership" } })

// 10. Удалить все проекты у сотрудника "Bob"
db.employees.updateOne({ name: 'Bob' }, { $set: { projects: [] } })

// 11. Добавить новый проект "Project G" для всех сотрудников старше 30 лет
db.employees.updateMany({ age: { $gte: 30 } }, { $push: { projects: "Project G" } })