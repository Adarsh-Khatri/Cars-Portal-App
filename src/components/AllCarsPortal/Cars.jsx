import React, { Component } from 'react';
import OptionsCB from './OptionsCB';
import { get } from './HttpService';
import queryString from 'query-string'
import { Link } from 'react-router-dom';

export default class Cars extends Component {

    state = {
        carsData: [],
        sortArr: ['kms', 'price', 'year'],
        fuelArr: ['Diesel', 'Petrol'],
        typeArr: ['Hatchback', 'Sedan'],
        priceOptions: { minprice: '', maxprice: '' },
    }

    async fetchData() {
        let queryParams = this.props.location.search;
        let res;
        if (queryParams) {
            res = await get(`/cars${queryParams}`)
        } else {
            this.setState({ priceOptions: { minprice: '', maxprice: '' } })
            res = await get(`/cars`)
        }
        this.setState({ carsData: res.data });
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData()
        }
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({ pathname: url, search: searchStr })
    }

    makeSearchString = (options) => {
        let { fuel, type, sort, minprice, maxprice } = options;
        let searchStr = '';
        searchStr = this.addToQueryString(searchStr, 'fuel', fuel);
        searchStr = this.addToQueryString(searchStr, 'type', type);
        searchStr = this.addToQueryString(searchStr, 'minprice', minprice);
        searchStr = this.addToQueryString(searchStr, 'maxprice', maxprice);
        searchStr = this.addToQueryString(searchStr, 'sort', sort);
        return searchStr;
    };

    addToQueryString = (str, paramName, paramValue) => {
        return ((paramValue ? str ? `${str}&${paramName}=${paramValue}` :
            `${paramName}=${paramValue}` : str))
    }

    handleOptionChange = (options) => {
        this.callURL(`/cars`, options)
    }

    handlePriceChange = (e) => {
        let s1 = this.state;
        s1.priceOptions[e.target.name] = e.target.value;
        this.setState(s1)
        this.callURL(`/cars`, s1.priceOptions)
    }

    render() {
        let { carsData = [], fuelArr, typeArr, sortArr, priceOptions = { minprice: '', maxprice: '' } } = this.state;

        let queryParams = queryString.parse(this.props.location.search);

        return (
            <div className="container  mt-3 mb-5">
                <div className="row">
                    <h1 className='fw-bold text-center' style={{ fontFamily: "fantasy" }}>ALL CARS</h1>
                    <div className="col-sm-3">
                        <OptionsCB options={queryParams} fuelArr={fuelArr} typeArr={typeArr} sortArr={sortArr} onOptionChange={this.handleOptionChange} />
                    </div>
                    <div className="col-sm-9 text-center">
                        <div className="row my-3">
                            <div className="col-sm-3">
                                <label className='form-label form-label-inline fw-bold fs-5'>Price Range : </label>
                            </div>
                            <div className="col-sm-3">
                                <input type="text" className='form-control form-control-inline' name="minprice" placeholder='Enter Minimum Price' value={priceOptions.minprice} onChange={(e) => this.handlePriceChange(e)} />
                            </div>
                            <div className="col-sm-3">
                                <input type="text" className='form-control form-control-inline' name="maxprice" placeholder='Enter Maximum Price' value={priceOptions.maxprice} onChange={(e) => this.handlePriceChange(e)} />
                            </div>
                        </div>
                        {
                            carsData.length === 0 ? (
                                <h3 className='fw-bold my-5'>NO DATA</h3>
                            ) : (
                                <div className="row">
                                    {
                                        carsData.map((car, index) => (
                                            <div className="col-sm-3 p-0" key={car.id}>
                                                <div className='border bg-warning p-3'>
                                                    <h3 className='fw-bold'>{car.model}</h3>
                                                    <h5>Price: {car.price}</h5>
                                                    <h5>Color: {car.color}</h5>
                                                    <h5>Mileage: {car.kms}</h5>
                                                    <h5>Manufactured In {car.year}</h5>
                                                    <div className='d-flex justify-content-between'>
                                                        <Link className="text-success" to={`/cars/${car.id}/edit`}>
                                                            <i className="fs-5 fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                        <Link className="text-danger" to={`/cars/${car.id}/delete`}>
                                                            <i className="fs-5 fa-solid fa-trash"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        )
    }
}
