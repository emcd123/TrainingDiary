import React, { Component } from 'react';
import axios from 'axios';
import authService from './api-authorization/AuthorizeService'
import './home.css';
import { Link } from "react-router-dom"; 
import { Button } from 'reactstrap';

import { SessionCard } from './view-controls/SessionCard'

export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.renderSessionsList = this.renderSessionsList.bind(this);
        this.removeFromSessionList = this.removeFromSessionList.bind(this);
        this.state = { sessions: [], loading: true };
    }

    componentDidMount() {
        this.populateSessionData();
    }

    renderSessionsList() {
        let sessions = this.state.sessions;
        sessions.sort(function (a, b) {
            var key1 = new Date(a.date);
            var key2 = new Date(b.date);

            if (key1 < key2) {
                return -1;
            } else if (key1 == key2) {
                return 0;
            } else {
                return 1;
            }
        });
        return (
            <div>
                {sessions.map(session => (
                    <SessionCard SessionId={session.id} SessionDate={session.completedDate} ExcerciseEntries={session.excercises} removeFromSessionList={this.removeFromSessionList}/>
                ))}
                <pre>{JSON.stringify(sessions, null, 2)}</pre>
            </div>
        );
    }

    async removeFromSessionList(value) {
        let sessions = this.state.sessions;
        var sessionList = sessions.filter(obj => obj.id !== value);
        this.setState({
            sessions: sessionList
        })

        const token = await authService.getAccessToken();
        let URL = 'api/Sessions/' + value;
        axios.delete(URL, { data: {}, headers: { 'Authorization': `Bearer ${token}` } });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSessionsList(this.state.sessions);

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



