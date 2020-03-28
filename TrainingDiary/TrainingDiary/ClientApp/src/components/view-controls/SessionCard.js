import React, { Component } from 'react';
import { ExcerciseEntry } from './ExcerciseEntry'

export class SessionCard extends React.Component {
    render() {
        return (
            <div>
                <div >
                    <div class="card mb-4">
                        <div class="card-header">
                            {new Intl.DateTimeFormat('en-GB', {
                                month: 'long',
                                day: '2-digit',
                                year: 'numeric',
                            }).format(new Date(this.props.SessionDate))}
                        </div>

                        <div class="card-body">
                            <div>
                                {this.props.ExcerciseEntries.map(detail => (
                                    <ExcerciseEntry excercise={detail} />
                                ))}
                            </div>
                            <div class="text-right">
                                <button class="btn-danger mr-2">Delete</button>
                                <button class="btn-primary">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SessionCard;