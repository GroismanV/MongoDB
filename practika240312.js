
// https://github.com/NelliEfr/Group_220823_GenTech/blob/main/05_03.js
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

// 2. Всем документам в коллекции products добавить свойство class со значением 'not defined'
db.products.updateMany(
    {},
    { $set: { class: 'not defined' } }
)

// 3. У всех документов в свойстве class заменить значение на []
db.products.updateMany(
    {},
    { $set: { class: [] } }
)

// 4. Всем продуктам, чья цена больше 300, добавить в массив class значение A
db.products.updateMany(
    { price: { $gt: 300 } },
    { $push: { class: 'A' } }
)
// 5. Всем продуктам чья цена больше 200 и меньше или равна 500 добавить в массив class значения B, C
db.products.updateMany(
    { price: { $gt: 200, $lte: 500 } },
    { $push: { class: { $each: ['B', 'C'] } } }
)

// 6. Всем продуктам добавить класс C. Но если такой класс уже есть в массиве, не дублировать

db.products.updateMany(
    {},
    { $addToSet: { class: 'С' } }
)
// 7. Продуктам, чья цена находится в диапазоне от 100 до 400 вкл. увеличить цену на 150

db.products.updateMany(
    { price: { $gte: 100, $lte: 400 } },
    { $inc: { price: 150 } }
)

// 8. Всем продуктам уменьшить цену на 20

db.products.updateMany(
    {},
    { $inc: { price: -20 } }
)