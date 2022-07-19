// create 5 burgers (at least 3 should be beef)
db.burgers.insertMany([{name: "classic", protein: "beef", cheese: true, toppings:["lettuce", "tomato", "onion"]}, {name: "basic", protein:"beef", cheese: false, toppings:[]}, {name: "messy", protein: "beef", cheese: true, toppings:["ketchup", "BBQ Sauce", "mustard", "mayo", "hot sauce"]}, {name: "eccentric", protein: "kangaroo", cheese: true, toppings:["waffles", "skittles", "whipped cream", "pineapple"]}, {name: "fancy", protein: "caviar", cheese: true, toppings: ["gold leaf", "cream cheese"]}])

// find all the burgers
db.burgers.find({})

// show just the meat of each burger
db.burgers.find({}, {protein: 1})

// show just the toppings of each burger
db.burgers.find({}, {toppings: 1})

// show everything but the cheese
db.burgers.find( {}, {name: 1, protein: 1, toppings: 1} )

// find all the burgers with beef
db.burgers.find({protein:"beef"})

// find all the burgers that are not beef
db.burgers.find( { protein: { $ne: "beef" } } )

// find the first burger with cheese
db.burgers.findOne( {"cheese": true} )

// find one and update the first burger with cheese to have a property of 'double cheese'
db.burgers.updateOne( {cheese: true}, {$set: {cheese: "DOUBLE CHEESE"}})


// find the burger you updated to have double cheese
db.burgers.findOne( {cheese: "DOUBLE CHEESE"} )


// find and update all the beef burgers to be 'veggie'
db.burgers.updateMany( {protein: "beef"}, {$set: {protein: "veggie"}})

// delete one of your veggie burgers
db.burgers.deleteOne({protein: "veggie"})
// WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})

// drop the collection
db.burgers.deleteMany({})
//Expected Output
//true

// drop the database
db.dropDatabase()
//Expected Output
// {
//   "dropped": "burgers",
//   "ok": 1
// }

//
// Bonus
//recreate your burgers database and your burger collection
use mongoBurger
//copy paste your insert burgers from above to reseed your database

// Change the name of the key cheese to 'pumpkinSpice'
mongoBurger> db.burgers.updateMany({}, {$rename: {"cheese": "PumpkinSpice"}})

// find all the burgers with ketchup (or another topping you used at least once)
db.burgers.find( { toppings: "ketchup"} )

// find all the burgers with pickles (or a topping you used more than once) and remove the pickles
db.burgers.updateMany({}, {$pull: {toppings: {$in: ["whipped cream"]},}} )

// add a topping of 'eggs' to all the beef burgers
db.burgers.updateMany( { protein: "beef" }, { $push: { toppings: { $each: ["eggs"]}}} )
//note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact

//Add a price to each burger, start with $5.00 for each burger
db.burgers.updateMany({}, { $set: {price: '$5.00'}})