const Celebrity = require('../models/celebrity.model');

require('../config/db.config');

const celebrities = [
  {
    name: "Pepe Viyuela",
    catchPhrase: ":|",
    occupation: "A"
  },
  {
    name: "Brad Pitt",
    catchPhrase: "...",
    occupation: "B"
  },
  {
    name: "Charlize Theron",
    catchPhrase: ":/",
    occupation: "C"
  }
];

Celebrity.deleteMany({})
  .then(() => {
    console.log('Celebrities deleted')
  })
  .then(() => {
    return Celebrity.create(celebrities)
      .then(createdCelebrities => {
        createdCelebrities.forEach(celebrity => {
          console.log(`Celebrity created - ${celebrity.name}`)
        })
      })
  })
  .catch(err => console.error(err))