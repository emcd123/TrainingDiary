import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export class NewExcerciseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "sets": 0,
            "reps": 0,
            "rpe": 0,
            "weightLifted": 0

        };
    }

    handleFormSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('sets', this.state.sets)
        formData.append('reps', this.state.reps)
        formData.append('rpe', this.state.rpe)
        formData.append('weightLifted', this.state.weightLifted)

        var excercise = {};
        formData.forEach(function (value, key) {
            excercise[key] = value;
        });
        this.props.handleStateChange(excercise);
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="excerciseName">Name</Label>
                    <Input type="text" name="name" id="excerciseName"
                        onChange={e => this.setState({ name: e.target.value })}/>
                </FormGroup>
                <FormGroup>
                    <Label for="excerciseSets">Sets</Label>
                    <Input type="text" name="sets" id="excerciseSets"
                        onChange={e => this.setState({ sets: e.target.value })}/>
                </FormGroup>
                <FormGroup>
                    <Label for="excerciseReps">Reps</Label>
                    <Input type="text" name="reps" id="excerciseReps"
                        onChange={e => this.setState({ reps: e.target.value })}/>
                </FormGroup>
                <FormGroup>
                    <Label for="excerciseRpe">RPE</Label>
                    <Input type="text" name="rpe" id="excerciseRpe"
                        onChange={e => this.setState({ rpe: e.target.value })}/>
                </FormGroup>
                <FormGroup>
                    <Label for="excerciseWeight">Weight</Label>
                    <Input type="text" name="weight" id="excerciseWeight"
                        onChange={e => this.setState({ weightLifted: e.target.value })}/>
                </FormGroup>
                <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Add" />
            </Form>
       );
    }
}
export default NewExcerciseForm;
