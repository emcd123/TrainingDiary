import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron } from 'reactstrap';
import { AddExcerciseModal } from './modals/AddExcerciseModal';
import { NewExcerciseForm } from './view-controls/NewExcerciseForm';

export class AddSession extends Component {
    static displayName = AddSession.name;

    constructor() {
        super();
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSessionSubmit = this.handleSessionSubmit.bind(this);
    }

    state = {
        excercises: []
    }

    handleSessionSubmit(event) {
        const {
            session
        } = this.state;

        event.preventDefault();

        // do something with form values, and then
        axios.post('api/Sessions', {
            session // + any other parameters you want to send in the POST request
        }).then(response => {
            // do something with response, and on response
        }).catch(error => {
            // do something when request was unsuccessful
        });
    }

    handleStateChange(value) {
        let excercises = this.state.excercises;
        excercises.push(value);
        this.setState({ excercises: excercises })
    }

    render() {
        return (
            <div>
                <div class="row" style={{ marginBottom: 25 }}>
                    <div class="col-md-10">
                        <h1 id="tabelLabel" >Add new session</h1>
                    </div>
                    <div class="col col-lg-2">
                        <AddExcerciseModal buttonLabel="Add Excercise" />
                    </div>
                </div>
                <Jumbotron>
                    <NewExcerciseForm handleStateChange={this.handleStateChange} />
                </Jumbotron>
                <table border='1' width='100%' >
                    <tr>
                        <th>Name</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Rpe</th>
                        <th>Weight Lifted</th>
                    </tr>

                    {this.state.excercises.map((excercise) => (
                        <tr>
                            <td>{excercise.name}</td>
                            <td>{excercise.sets}</td>
                            <td>{excercise.reps}</td>
                            <td>{excercise.rpe}</td>
                            <td>{excercise.weightLifted}</td>
                        </tr>
                    ))}
                </table>
                <Button color="success" onclick={e => this.handleSessionSubmit(e)} >Submit</Button>{' '}
                <Button color="danger">Clear</Button>{' '}
            </div>
        );
    }
}