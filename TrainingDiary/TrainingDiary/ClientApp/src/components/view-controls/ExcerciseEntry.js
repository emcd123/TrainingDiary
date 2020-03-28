import React, { Component } from 'react';

export class ExcerciseEntry extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.excercise.name.charAt(0).toUpperCase() + this.props.excercise.name.slice(1)} {this.props.excercise.sets}x{this.props.excercise.reps} {this.props.excercise.weightLifted}kg</p>
            </div>
        );
    }
}

export default ExcerciseEntry;