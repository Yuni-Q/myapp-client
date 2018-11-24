import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class signIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isAuthenticated: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };


    fetchSearchTopStories(userName, password) {
        axios.post('http://127.0.0.1:8080/signIn', {
            userName,
            password,
        })
            // .then(response => response.json())
            .then(result => {
                if (result.data.ok) {
                    this.setState({
                        isAuthenticated: true,
                    })
                    sessionStorage.setItem('isAuthenti')
                }
            })
            // .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    onSubmit(event) {
        const { userName, password } = this.state;
        this.fetchSearchTopStories(userName, password);
        event.preventDefault();
    }

    setSearchTopStories(result) {
        this.setState({ result });
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    render() {
        const { isAuthenticated } = this.state
        return (
            <div>
                <h1>로그인</h1>
                <table className="login">
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="userName">userName</label>
                            </td>
                            <td>
                                <input type="text" name="userName" placeholder="userName" id="userName" onChange={this.handleChange} value={this.state.userName} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="user_password">password</label>
                            </td>
                            <td>
                                <input type="password" name="password" placeholder="password" id="password" onChange={this.handleChange} value={this.state.password} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input className="submitButton" type="submit" value="로그인" onClick={this.onSubmit} />
                {isAuthenticated && <Redirect to="/" />}
            </div>
        );
    }
}

const Search = ({
    value,
    onChange,
    onSubmit,
    children
}) =>
    <form onSubmit={onSubmit}>
        <input
            type="text"
            value={value}
            onChange={onChange}
        />
        <button type="submit">
            {children}
        </button>
    </form>

class Button extends React.Component {
    render() {
        const {
            onClick,
            className = '',
            children,
        } = this.props;

        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {children}
            </button>
        );
    }
}

export default signIn;