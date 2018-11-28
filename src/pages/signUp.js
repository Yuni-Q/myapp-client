
import React from 'react';
import axios from 'axios';
import { SampleConsumer } from '../contexts/sample';
// import { Link, Route } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };

    componentDidMount() {
        // :: 초기 값 설정
    }

    fetchSearchTopStories(email, password) {
        axios.post('http://127.0.0.1:8080/users', {
            email,
            password,
        })
            // .then(response => response.json())
            .then(result => {
                if (result.data.ok) {
                    this.setState({
                        isAuthenticated: true,
                    });
                    localStorage.setItem('isAuthenticated', `Bearer ${result.data.result.token}`);
                    localStorage.setItem('nickName', result.data.result.nickName);
                    console.log(result.data.result.token);
                    console.log(result);
                    this.props.setValue(this.state.isAuthenticated);
                } else {
                    this.setState({
                        isAuthenticated: false,
                    });
                    localStorage.clear();
                    this.props.setValue(this.state.isAuthenticated);
                }
            })
            .catch(error => error);
    }

    onSubmit(event) {
        const { email, password } = this.state;
        this.fetchSearchTopStories(email, password);
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
    return (
        <>
         <table class="login">
            <tr>
                <td>
                    <label for="userName">userName</label>
                </td>
                <td>
                <input type="text" name="email" placeholder="email" id="email" onChange={this.handleChange} value={this.state.userName} />
                </td>
            </tr>
            <tr>
                <td>
                    <label for="password">password</label>
                </td>
                <td>
                <input type="password" name="password" placeholder="password" id="password" onChange={this.handleChange} value={this.state.password} />
                </td>
            </tr>
        </table>
        <input className="submitButton" type="submit" value="회원가입" onClick={this.onSubmit} />
        </>
    );
};
}

export default SignUp;