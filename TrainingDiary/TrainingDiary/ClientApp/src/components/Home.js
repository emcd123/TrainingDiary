import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import './home.css';

class ExcerciseEntry extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.excercise.name.charAt(0).toUpperCase() + this.props.excercise.name.slice(1)} {this.props.excercise.sets}x{this.props.excercise.reps} {this.props.excercise.weightLifted}kg</p>
            </div>
        );
    }
}

class SessionCard extends React.Component {
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

export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { sessions: [], loading: true };
    }

    componentDidMount() {
        this.populateSessionData();
    }

    static renderSessionsList(sessions) {
        return (
            <div>
                {sessions.map(session => (
                    <SessionCard SessionDate={session.completedDate} ExcerciseEntries={session.excercises} />
                ))}
                <pre>{JSON.stringify(sessions, null, 2)}</pre>
            </div>
        );
    }
    
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderSessionsList(this.state.sessions);

        return (
            <div>
                <div class="row" style={{marginBottom: 25}}>
                    <div class="col-md-10">
                        <h1 id="tabelLabel" >Sessions List</h1>
                    </div>
                    <div class="col col-lg-2">
                        <button class="btn-lg btn-primary">Add Session</button>
                    </div>
                </div>
                {contents}
            </div>
      );
    }
    async populateSessionData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/sessions/', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ sessions: data, loading: false });
    }
}


