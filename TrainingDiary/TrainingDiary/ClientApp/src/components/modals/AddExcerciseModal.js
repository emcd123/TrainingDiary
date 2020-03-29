import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class AddExcerciseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button color="info" size="md" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> Add Excercise to Session</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="excerciseName">Name</Label>
                                <Input type="text" name="name" id="excerciseName" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="excerciseSets">Sets</Label>
                                <Input type="text" name="sets" id="excerciseSets" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="excerciseReps">Reps</Label>
                                <Input type="text" name="reps" id="excerciseReps" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="excerciseRpe">RPE</Label>
                                <Input type="text" name="rpe" id="excerciseRpe" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="excerciseWeight">Weight</Label>
                                <Input type="text" name="weight" id="excerciseWeight" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddExcerciseModal;