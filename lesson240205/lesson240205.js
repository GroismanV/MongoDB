db.departments.insertMany([
    {
        "name": "HR",
        "employees": [
            { "name": "Alice", "position": "Manager" },
            { "name": "Bob", "position": "HR Specialist" },
            { "name": "Charlie", "position": "Recruiter" },
            { "name": "David", "position": "Assistant" },
            { "name": "Eva", "position": "Intern" }
        ]
    },
    {
        "name": "IT",
        "employees": [
            { "name": "Frank", "position": "CTO" },
            { "name": "Grace", "position": "Developer" },
            { "name": "Henry", "position": "SysAdmin" },
            { "name": "Ivy", "position": "QA Engineer" },
            { "name": "Jack", "position": "Support Specialist" }
        ]
    }
])


// 2. Получить первого сотрудника из департамента IT и отобразить только его имя.
db.departments.findOne({ name: "IT" }, { employees: { $slice: ["$employees.name", 0, 1] } }).employees

db.departments.findOne({ name: 'IT' }).employees[0].name

db.departments.findOne({ name: 'IT' }).employees.length // 5

db.departments.findOne({ name: 'IT' }).employees.find(el => el.position === 'CTO')
db.departments.findOne({ name: 'IT' }).employees.map(el => el.position)

db.departments.findOne({ name: 'IT' }).employees.filter(el => el.position === 'CTO' || el.position === 'Developer')


// 3. Создать коллекцию products

db.products.insertMany(
    [
        {
            _id: 1,
            title: 'Apple',
            price: 500,
            quantity: 4,
            in_stock: true,
            origin: [
                {
                    country: 'Germany',
                    city: 'Berlin'
                },
                {
                    country: 'Germany',
                    city: 'Bremen'
                },
                {
                    country: 'Spain',
                    city: 'Madrid'
                },
            ]
        },
        {
            _id: 2,
            title: 'Orange',
            price: 100,
            quantity: 0,
            in_stock: false,
            origin: [
                {
                    country: 'Spain',
                    city: 'Madrid'
                },
                {
                    country: 'France',
                    city: 'Paris'
                }
            ]
        },
        {
            _id: 3,
            title: 'Kiwi',
            price: 150,
            quantity: 1,
            in_stock: true,
            origin: [
                {
                    country: 'Spain',
                    city: 'Madrid'
                },
                {
                    country: 'Germany',
                    city: 'Berlin'
                }
            ]
        },
        {
            _id: 4,
            title: 'Banana',
            price: 450,
            quantity: 0,
            in_stock: false,
            origin: [
                {
                    country: 'Austria',
                    city: 'Vienna'
                },
                {
                    country: 'France',
                    city: 'Paris'
                }
            ]
        }
    ]
)

// 4. Найти товары на складе, цена которых превышает 200 y.e.

db.products.find({
    in_stock: true,
    price: { $gt: 200 }
})

// 5. Вывести все продукты в порядке убывания цены

db.products.find().sort({ price: -1 })


// 6. Вывести все продукты дороже 200 у.е. в порядке убывания цены

db.products.find({ price: { $gt: 200 } }).sort({ price: -1 })


// 7. Составить массив из городов у продукта Apple => ['Berlin', 'Bremen', 'Madrid']

db.products.findOne({ title: 'Apple' }).origin.map(el => el.city)
db.products.findOne({ title: "Apple" }, { origin: "$origin.city" }).origin

// 8. Составить массив из городов Германии у продукта Apple 
// => [ {country: 'Germany', city: 'Berlin'}, {country: 'Germany', city: 'Bremen'} ]

db.products.findOne({ title: 'Apple' }).origin.filter(el => el.country === 'Germany')


// 9. Составить массив из городов Германии у продукта Apple 
// => [ 'Berlin', 'Bremen' ]

db.products.findOne({ title: 'Apple' }).origin.filter(el => el.country === 'Germany').map(el => el.city)