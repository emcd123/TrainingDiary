import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import './home.css';
import { Link } from "react-router-dom"; 
import { Button } from 'reactstrap';

import { SessionCard } from './view-controls/SessionCard'

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
                        <Link to="/add-session" className="btn btn-primary btn-lg">Add Session</Link>
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



