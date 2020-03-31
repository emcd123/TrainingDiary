import React, { Component } from 'react';
import { Link } from "react-router-dom"; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class CancelSubmissionModal extends React.Component {
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
                <Button style={{ marginLeft: 5 }} color="danger" size="md" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{ "Are you Sure?" }</ModalHeader>
                    <ModalBody>
                        Please confirm you are sure, this will permanently delete the unsubmitted data.
                    </ModalBody>
                    <ModalFooter>
                        <Link to={this.props.urlRoute} className="btn btn-danger btn-md">Confirm</Link>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CancelSubmissionModal;