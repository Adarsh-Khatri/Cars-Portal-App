import React, { Component } from 'react'
import { deleteApi } from './HttpService'

export default class DeleteCar extends Component {

    async componentDidMount() {
        const { id } = this.props.match.params;
        await deleteApi(`/cars/${id}`)
        this.props.history.push('/cars');
    }
    render() { return '' }
}
