import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './Menu.css';
import axios from 'axios';
// Fragments

const activeStyle = {
    color: 'green',
    fontSize: '2rem'
};
export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);

    };

    fetchSearchTopStories(email, password) {
        axios.delete('http://127.0.0.1:8080/signIn', {
            headers: { // 요청 헤더
                authorization: localStorage.getItem('isAuthenticated'),
              },
        })
            // .then(response => response.json())
            .then(result => {
                console.log(result);
                // if (result.data.ok) {
                //     this.setState({
                //         isAuthenticated: true,
                //     })
                //     localStorage.clear();
                //     // localStorage.removeItem('test');
                //     console.log(result.data.result.token);
                //     console.log(result);
                // }
            })
            .catch(error => error);
    }

    onSubmit(event) {
        this.fetchSearchTopStories(localStorage.getItem('isAuthenticated'));
        event.preventDefault();
    }
    
    render(){
        const { isAuthenticated } = this.state
        return (
            <React.Fragment>
            <nav>
                <span className="myName">Yuni-Q</span>
                <ul>
                    <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
                    <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                    {
                        localStorage.getItem('isAuthenticated')
                            ? (<React.Fragment><li><button onClick={this.onSubmit}>sign out</button></li></React.Fragment>)
                                : (<React.Fragment><li><NavLink exact to="/signIn" activeStyle={activeStyle}>sign In</NavLink></li><li><NavLink exact to="/signUp" activeStyle={activeStyle}>sign Up</NavLink></li></React.Fragment>)
                    }
                </ul>
                
            </nav>
            <hr/>
            {isAuthenticated && <Redirect to="/" />}
            </React.Fragment>
            
        );
    };
}

