import React from 'react';
import { request } from 'http';


class signIn extends React.Component {

    constructor(props) {
        super(props);
        this.status = {
            userName: 'id',
            password: 'ps',
        }
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };


    fetchSearchTopStories(searchTerm) {
        console.log(searchTerm);
        request(`http://127.0.0.1:8080/signIn`)
            .then(response => response.json())
            .then(result => console.log(result))
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

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });

    }

    onUserNameChange(event) {
        this.setState({ userName: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
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
                                <input type="text" name="userName" placeholder="userName" id="userName" onChange={this.onUserNameChange} value={this.status.userName} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="user_password">password</label>
                            </td>
                            <td>
                                <input type="password" name="password" placeholder="password" id="password" onChange={this.onPasswordChange} value={this.status.password} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input className="submitButton" type="submit" value="로그인" onClick={this.onSubmit} />
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