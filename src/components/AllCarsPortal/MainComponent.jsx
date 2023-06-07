import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Cars from './Cars';
import AddCars from './AddCars';
import DeleteCar from './DeleteCar';

export default class MainComponent extends Component {

    render() {
        return (
            <>
                <div className="container">
                    <NavBar />
                    <Switch>

                        <Route path='/cars/add' component={AddCars} />

                        <Route path='/cars/:id/delete' component={DeleteCar} />

                        <Route path='/cars/:id/edit' component={AddCars} />

                        <Route path='/cars' component={Cars} />

                        <Redirect from="/" to='/cars' />

                    </Switch>

                </div>
            </>

        )
    }
}

