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
            if (key != 'name') {
                excercise[key] = parseInt(value, 10)
            }
            else {
                excercise[key] = value;
            }
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
                    <Input type="number" name="sets" id="excerciseSets"
                        onChange={e => this.setState({ sets: e.target.value })}/>
                </FormGroup>
                <FormGroup>
                    <Label for="excerciseReps">Reps</Label>
                    <Input type="number" name="reps" id="excerciseReps"
                        onChange={e => this.setState({ reps: e.target.value })}/>
                </FormGroup>
                <FormGroup>
                    <Label for="excerciseRpe">RPE</Label>
                    <Input type="number" name="rpe" id="excerciseRpe"
                        onChange={e => this.setState({ rpe: e.target.value })}/>
                </FormGroup>
                <FormGroup>
                    <Label for="excerciseWeight">Weight</Label>
                    <Input type="number" name="weight" id="excerciseWeight"
                        onChange={e => this.setState({ weightLifted: e.target.value })}/>
                </FormGroup>
                <Button color="success" size="md" type="submit" onClick={e => this.handleFormSubmit(e)} > Add </Button>
            </Form>
       );
    }
}
export default NewExcerciseForm;
