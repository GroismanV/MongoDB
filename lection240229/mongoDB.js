// 1. Создать коллекцию workers.
// 2. Заполнить коллекцию workers 5 документами со свойствами _id, firstname, lastname, age, position, salary, skills. Используйте следующие данные:

// 1. Inga Petrova, 27, Barista, 1500, [’preparing drinks’, ‘cleaning equipment’] 
// 2. Boris Orlov, 36, Server, 2400, [’taking orders’, ‘suggesting meals’, ‘taking payments’]
// 3. Ivan Demidov, 32, Chef, 3200, [’preparing food’, ‘baking bread’]
// 4. Marina Sidorova, 22, Hostess, 1700, [’greeting guests’, ‘seating guests’, ‘answering phone calls’]
// 5. Olga Ivanova, 43, Sommelier, 2500, [’curating a wine list’, ‘creating wine pairings’]

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


//   Найти всех работников, чья зарплата больше 2000.
db.workers.find({ salary: { $gt: 2000 } })

// Найти всех работников младше 30 лет.
db.workers.find({ age: { $lt: 30 } })

// Найти всех работников, у которых должность "Server" или "Chef".
db.workers.find({ position: { $in: ['Server', 'Chef'] } })

db.workers.find({ $or: [{ position: 'Server' }, { position: 'Chef' }] })


// Найти всех работников, чьи навыки включают 'baking bread' 
db.workers.find({ skills: 'baking bread' })
db.workers.find({ skills: { $eq: 'baking bread' } })
db.workers.find({ skills: { $in: ['baking bread'] } })

// Найти всех работников, чьи навыки равняются(строго) 'baking bread' 
db.workers.find({ skills: ['baking bread'] })
// Пустая выборка

// Найти всех работников, чьи навыки равняются(строго) ['preparing food', 'baking bread'] 
db.workers.find({ skills: ['preparing food', 'baking bread'] })
// Результат...


db.workers.find({ skills: ['baking bread', 'preparing food'] })
// Пустая выборка

// Найти всех работников, чьи навыки включают "taking orders".
db.workers.find({ skills: 'taking orders' })

// Найти всех работников, чьи навыки не включают "baking bread".
db.workers.find({ skills: { $not: { $eq: 'baking bread' } } })
db.workers.find({ skills: { $ne: 'baking bread' } })


// Найти всех работников, чья зарплата меньше 2000 и чьи навыки включают "greeting guests".
db.workers.find({ $and: [{ salary: { $lt: 2000 } }, { skills: 'greeting guests' }] })
db.workers.find({ salary: { $lt: 2000 }, skills: 'greeting guests' })

// Найти всех работников, чья зарплата меньше 3000 или возраст больше 40.
db.workers.find({ $or: [{ salary: { $lt: 3000 } }, { age: { $gt: 40 } }] })


//   select firstname, lastname
//   from table

// find({Запрос}, {Проекция})

find({ age: 40 }, { firstname: 1, lastname: 1 })

//  Найти всех работников, чья зарплата меньше 3000 или возраст больше 40. Вывести только имя и фамилию
db.workers.find(
  { $or: [{ salary: { $lt: 3000 } }, { age: { $gt: 40 } }] },
  { firstname: 1, lastname: 1, _id: 0 }
)

//Найти всех работников, чья зарплата меньше 3000 или возраст больше 40. Вывести все поля, кроме зарплаты
db.workers.find(
  { $or: [{ salary: { $lt: 3000 } }, { age: { $gt: 40 } }] },
  { salary: 0 }
)

// 1 и 0 можно заменить true и false

// Пагинация

// find().limit(кол/во строк/записей)
// find().skip(кол/во строк, которое нужно пропустить)

//Вывести первого сотрудника
db.workers.find().limit(1)

// Вывести всех пропуская первых двух сотрудников
db.workers.find().skip(2)

//Вывести двух сотрудников пропуская первого сотрудника
db.workers.find().skip(1).limit(2)
db.workers.find().limit(2).skip(1)

// Сортировка

// find.sort({поле: 1(по возрс.)/-1(по убыв.)})

// Вывести всех сотрудников и сортировать их по возрасту по убыванию
db.workers.find().sort({ age: -1 })

// Вывести всех работников, кроме первого
db.workers.find().skip(1)

// Вывести работников с третьего по пятого
db.workers.find().skip(2).limit(3)

// Отсортировать всех работников по зарплате: от самой большой зарплаты до самой маленькой
db.workers.find().sort({ salary: -1 })

// Вывести трех людей, которые зарабатывают меньше всего
db.workers.find().sort({ salary: 1 }).limit(3)

// Пагинация массива
// slice = skip + limit для массива

// $slice: limit
// $slice: [skip, limit]

// Вывести только первый навык сотрудника Марина
db.workers.find({ firstname: 'Marina' }, { skills: { $slice: 1 } })

// Вывести только первый навык всех сотрудников
db.workers.find({}, { skills: { $slice: 1 } })

// Вывести третий навык Марины
db.workers.find({ firstname: 'Marina' }, { skills: { $slice: [2, 1] } })

// Вывести последний навык Марины
db.workers.find({ firstname: 'Marina' }, { skills: { $slice: -1 } })

// skip = -2, limit = 1
db.workers.find({ firstname: 'Marina' }, { skills: { $slice: [-2, 1] } })

// Вывести последние навыки в списке у всех работников
db.workers.find({}, { skills: { $slice: -1 } })

// Вывести первый навык у работника Boris
db.workers.find({ firstname: 'Boris' }, { skills: { $slice: 1 } })


// Вывести только поле skills, и первый навык у работника Boris можно сделаеть только через агрегации.
db.workers.aggregate([
  {
    $match: { firstname: 'Boris' }
  },
  {
    $project: {
      _id: 0,
      first_skill: { $arrayElemAt: ["$skills", 0] }
    }
  }
])

