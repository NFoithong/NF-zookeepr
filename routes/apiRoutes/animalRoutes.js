const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');


router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
})

router.post('/animals', (req, res) => {
    //res.body is where our incoming content will be
    //set id based on what the nesxt index of the array will be
    req.body.id = animals.length.toString();
    // console.log(req.body);

    // if any data in req.body is incorrect, send 404 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // Write Animal Data to JSON
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);

        res.json(req.body);
    }
});

module.exports = router;