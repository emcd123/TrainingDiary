﻿import React, { Component } from 'react';
import axios from 'axios';
import authService from './api-authorization/AuthorizeService'
import { Button, Jumbotron } from 'reactstrap';
import { AddExcerciseModal } from './modals/AddExcerciseModal';
import { CancelSubmissionModal } from './modals/CancelSubmissionModal';
import { NewExcerciseForm } from './view-controls/NewExcerciseForm';
import { Table } from 'reactstrap';

export class AddSession extends Component {
    static displayName = AddSession.name;

    constructor() {
        super();
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSessionSubmit = this.handleSessionSubmit.bind(this);
        this.removeFromTable = this.removeFromTable.bind(this);
    }

    state = {             
        excercises: []
    }

    async handleSessionSubmit(event) {
        const token = await authService.getAccessToken();
        let excercises = this.state.excercises;
        let axiosConfig = {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        };

        // do something with form values, and then
        axios.post('api/Sessions', { excercises }, axiosConfig)
        .then(response => {
            console.log(response);
            console.log(response.data);
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
        });
    }

    handleStateChange(value) {
        let excercises = this.state.excercises;
        excercises.push(value);
        this.setState({ excercises: excercises })
    }

    removeFromTable(value) {
        let excercises = [...this.state.excercises]
        excercises.splice(value, 1)
        this.setState({
            excercises: excercises
        })
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
                <Table>
                    <tr>
                        <th>Name</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Rpe</th>
                        <th>Weight Lifted</th>
                        <th></th>
                    </tr>

                    {this.state.excercises.map((excercise) => (
                        <tr>
                            <td>{excercise.name}</td>
                            <td>{excercise.sets}</td>
                            <td>{excercise.reps}</td>
                            <td>{excercise.rpe}</td>
                            <td>{excercise.weightLifted}</td>
                            <td><Button color="danger" size="sm" onClick={this.removeFromTable} >Remove</Button></td>
                        </tr>
                    ))}
                </Table>
                <div clss="row-12" style={{ display: 'flex' }} >
                    <Button color="success" onClick={this.handleSessionSubmit}>Submit</Button>
                    <CancelSubmissionModal buttonLabel="Clear" urlRoute="/" />
                </div>
            </div>
        );
    }
}