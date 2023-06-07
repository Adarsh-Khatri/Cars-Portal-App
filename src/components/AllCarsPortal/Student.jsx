import React, { Component } from 'react';
import { get } from './HttpService';
import { Link } from 'react-router-dom';

export default class Student extends Component {

    state = { student: {} }

    async componentDidMount() {
        let { id } = this.props.match.params;
        let { data } = await get(`/svr/students/${id}`);
        this.setState({ student: data })
    }

    render() {
        let { student } = this.state;
        return (
            <div className="container">
                <h4>Details Of A Student</h4>
                <div>
                    Student Id : {student.id}<br />
                    Name: {student.name}<br />
                    Course: {student.course}<br />
                    Grade : {student.grade} <br />
                    City : {student.city}<br />
                    <Link className="btn btn-warning btn-sm me-4" to={`/students/${student.id}/edit`}>Edit</Link>
                    <Link className="btn btn-danger btn-sm " to={`/students/${student.id}/delete`}>Delete</Link>
                </div>
            </div>
        )
    }
}
