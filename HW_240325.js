// 1 уровень сложности: 1. Создайте пустую коллекцию students.
db.createCollection("students")



// Заполните ее данными о студентах.

db.students.insertMany([
    { name: "Alice", age: 20, major: "Computer Science", gpa: 3.5 },

    { name: "Bob", age: 22, major: "Mathematics", gpa: 3.8 },

    { name: "Charlie", age: 21, major: "Physics", gpa: 3.2 },

    { name: "David", age: 23, major: "Biology", gpa: 3.9 },

    { name: "Emma", age: 20, major: "Chemistry", gpa: 3.6 },

    { name: "Lucy", age: 21, major: "Physics", gpa: 3.4 },

    { name: "Maya", age: 22, major: "Biology", gpa: 3.7 },

    { name: "Tom", age: 19, major: "Chemistry", gpa: 3.4 },

    { name: "Lucas", age: 20, major: "Physics", gpa: 3.6 },

    { name: "Bill", age: 22, major: "Mathematics", gpa: 3.7 }
])

// Найдите количество студентов с GPA выше 3.5.
db.students.find({ gpa: { $gt: 3.5 } }).count()

// Найдите количество студентов младше 21 года.
db.students.find({ age: { $lt: 21 } }).count()

// Найдите всех студентов, у которых major - Physics, и установите им возраст 18 лет.

{ major: "Physics" },
{ $set: { age: 18 } }
)

// Увеличьте возраст студентов, у которых GPA ниже 3.5, на 1 год.
db.students.updateMany(
    { gpa: { $lt: 3.5 } },
    { $inc: { age: 1 } }
)

// Обновите GPA для студента "Charlie" на 3.4.
db.students.updateOne(
    { name: "Charlie" },
    { $set: { gpa: 3.4 } }
)

// Удалите студента с именем "David" из коллекции
db.students.deleteOne({ name: 'David' })

// Используя агрегацию, найдите средний GPA всех студентов.
db.students.aggregate(
    [
        { $group: { _id: null, avg_gpa: { $avg: '$gpa' } } }
    ]
)


// Используя агрегацию, найдите сумму возрастов всех студентов.
db.students.aggregate(
    [
        { $group: { _id: null, sum_age: { $sum: '$age' } } }
    ]
)

// Используя агрегацию, отсортируйте студентов по возрасту по убыванию и верните первых двух.
db.students.aggregate(
    [
        { $sort: { age: -1 } },
        { $limit: 2 }
    ]
)

// Используя агрегацию, найдите средний GPA среди студентов, возраст которых меньше 22 лет.
db.students.aggregate(
    [
        { $match: { age: { $lt: 22 } } },
        { $group: { _id: null, avg_gpa: { $avg: '$gpa' } } }
    ]
)


// Используя агрегацию, верните только имена студентов, чьи GPA выше 3.7.
db.students.aggregate(
    [
        { $match: { gpa: { $gt: 3.7 } } },
        { $project: { _id: 0, name: 1 } }
    ]
)

// Используя агрегацию, найдите средний возраст студентов в каждом мажоре, пропустив первые два результата.
db.students.aggregate(
    [
        { $group: { _id: '$major', age_gpa: { $avg: '$age' } } },
        { $skip: 2 }
    ]
)

// Используя агрегацию, найдите и верните только имя студента с самой высокой GPA.

db.students.aggregate(
    [
        { $sort: { gpa: -1 } },
        { $limit: 1 },
        { $project: { _id: 0, name: 1 } }
    ]
)