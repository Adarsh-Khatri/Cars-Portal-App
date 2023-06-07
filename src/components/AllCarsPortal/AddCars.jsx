import React, { Component } from 'react';
import { get, put, post } from './HttpService'

export default class AddCars extends Component {

    state = {
        car: { id: '', price: '', year: '', kms: '', model: '', color: '' },
        carMaster: [],
        sortArr: ['kms', 'price', 'year'],
        fuelArr: ['Diesel', 'Petrol'],
        typeArr: ['Hatchback', 'Sedan'],
        edit: false,
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData()
        }
    }

    async fetchData() {
        const { id } = this.props.match.params;
        if (id) {
            let { data } = await get(`/cars/${id}`)
            let { data: carMasterData } = await get(`/carmaster`)
            this.setState({ car: data, carMaster: carMasterData, edit: true })
        } else {
            let car = { id: '', price: '', year: '', kms: '', model: '', color: '' };
            let { data: carMasterData } = await get(`/carmaster`)
            this.setState({ car: car, carMaster: carMasterData, edit: false })
        }
    }

    handleChange = ({ currentTarget: input }) => {
        let s1 = { ...this.state }
        s1.car[input.name] = input.value;
        if (input.name === 'price') {
            s1.car[input.name] = +input.value;
        }
        this.setState(s1)
    }

    async postData(url, obj) {
        let res = await post(url, obj);
        this.props.history.push('/cars')
    }

    async putData(url, obj) {
        let res = await put(url, obj);
        this.props.history.push('/cars')
    }

    handleSubmit = (e) => {
        let { car, edit } = this.state;
        let s1 = this.state;
        e.preventDefault();
        if (car.id === '') {
            s1.car.id = 'DEMO-ID'
            this.setState(s1)
        }
        if (edit) {
            alert(`${car.id} UPDATED`);
        } else {
            alert(`${car.id} INSERTED`);
        }
        edit ? this.putData(`/cars/${car.id}`, car) : this.postData('/cars', this.state.car)
    }

    makeDropdown = (label, arr, name, value, startValue) => (
        <div className="form-group">
            <label className="mt-3" htmlFor={`rd${name}`}>{label}</label>
            <select className='form-select' id={`rd${name}`} name={name} value={value} onChange={(e) => this.handleChange(e)}>
                <option value="" disabled>{startValue}</option>
                {
                    arr.map(a1 =>
                        <option value={a1}>{a1}</option>
                    )
                }
            </select>
        </div>
    )
    f
    gettingModels = () => {
        let { carMaster } = this.state;
        return carMaster.map(car => car.model)
    }

    gettingColorByModel = (mod) => {
        let { carMaster } = this.state;
        if (mod) {
            return carMaster.find(car => car.model === mod).colors;
        } else {
            return [];
        }
    }

    render() {
        let { id, price, year, kms, model, color } = this.state.car;
        let { edit } = this.state;
        return (
            <div className="container">
                <div className="form-group">
                    <label className="mt-3" htmlFor='id'>Car ID</label>
                    <input type="text" className='form-control' id='id' name="id" placeholder='Enter Car Id' value={id} disabled={edit} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label className="mt-3" htmlFor='price'>Price</label>
                    <input type="text" className='form-control' id='price' name="price" placeholder='Enter Car Price' value={price} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label className="mt-3" htmlFor='kms'>Mileage In KMS</label>
                    <input type="text" className='form-control' id='kms' name="kms" placeholder='Enter Car Mileage in kms' value={kms} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label className="mt-3" htmlFor='year'>Year Of Manufacture</label>
                    <input type="text" className='form-control' id='year' name="year" placeholder='Enter Car Year' value={year} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        {this.makeDropdown('Model', this.gettingModels(), 'model', model, 'Enter Model')}
                    </div>
                    <div className="col-sm-6">
                        {this.makeDropdown('Color', this.gettingColorByModel(model), 'color', color, 'Enter Color')}
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button type='button' className='btn btn-primary my-3' onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </div>
            </div>
        )
    }
}









{/* <div className="form-group">
    <label className="mt-3" htmlFor='city'>City</label>
    <select className='form-select' id="city" name="city" value={city} onChange={(e) => this.handleChange(e)}>
        <option value="" disabled>Select City</option>
        {
            cities.map(city =>
                <option value={city}>{city}</option>
            )
        }
    </select>
</div> */}