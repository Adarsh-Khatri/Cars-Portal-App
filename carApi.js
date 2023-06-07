let express = require("express");
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 3080;

let app = express();
app.use(express.json());

app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
    res.header("Access-Control-Allo-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.listen(PORT, () => console.log(`Listening on port http://localhost/${PORT}`))

let { cars, carMaster, getCarDetailByModel } = require('./carData.js')

app.get('/cars', (req, res) => {
    let { minprice, maxprice, fuel, type, sort } = req.query;
    let originalCars = cars;
    if (fuel) {
        originalCars = originalCars.filter(car => getCarDetailByModel(car.model)["fuel"] === fuel)
    }
    if (type) {
        originalCars = originalCars.filter(car => getCarDetailByModel(car.model)["type"] === type)
    }
    if (maxprice) {
        originalCars = originalCars.filter(car => car.price <= maxprice)
    }
    if (minprice) {
        originalCars = originalCars.filter(car => car.price >= minprice)
    }
    if (sort === 'kms' || sort === 'price' || sort === 'year') {
        originalCars.sort((a, b) => a[sort] - b[sort])
    }
    console.log(originalCars);
    res.send(originalCars)
})

app.post('/cars', (req, res) => {
    let newCar = req.body;
    cars.push(newCar)
    res.send(newCar)
})

app.get('/cars/:id', (req, res) => {
    let { id } = req.params;
    let index = cars.findIndex(car => car.id === id)
    if (index >= 0) {
        let carDetail = cars[index]
        res.send(carDetail)
    } else {
        res.status(404).send(`CAR NOT FOUND WITH ID ${id}`)
    }
})

app.put('/cars/:id', (req, res) => {
    let { id } = req.params;
    let index = cars.findIndex(car => car.id === id)
    if (index >= 0) {
        let updatedCar = req.body;
        cars[index] = { ...updatedCar }
        res.send(updatedCar)
    } else {
        res.status(404).send(`CAR NOT FOUND WITH ID ${id}`)
    }
})

app.delete('/cars/:id', (req, res) => {
    let { id } = req.params;
    let index = cars.findIndex(car => car.id === id)
    if (index >= 0) {
        let deletedCar = cars.splice(index, 1);
        res.send(deletedCar)
    } else {
        res.status(404).send(`CAR NOT FOUND WITH ID ${id}`)
    }
})

app.get('/carmaster', (req, res) => {
    res.send(carMaster)
})