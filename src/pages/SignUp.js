
import React from 'react';
import axios from 'axios';
// import { SampleConsumer } from '../contexts/sample';
import { Redirect } from 'react-router-dom';
// import { Link, Route } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            signUp: false,
            error: false,
            errorMessage: '',
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
                console.log(result.data);
                if (result.data.ok) {
                    this.setState({
                        signUp: true,
                    });
                } else {
                    this.setState({
                        error: true,
                        errorMessage: result.data.error,
                    });
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
        <h1>회원가입</h1>
        {
            this.state.error ? (<div style={{ color: 'red' }}>{this.state.errorMessage}</div>): (null) 
        }
         <table className="login">
            <tbody>
                <tr>
                    <td>
                        <label htmlFor="userName">userName</label>
                    </td>
                    <td>
                    <input type="text" name="email" placeholder="email" id="email" onChange={this.handleChange} value={this.state.userName} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password">password</label>
                    </td>
                    <td>
                    <input type="password" name="password" placeholder="password" id="password" onChange={this.handleChange} value={this.state.password} />
                    </td>
                </tr>
            </tbody>
        </table>
        <input className="submitButton" type="submit" value="회원가입" onClick={this.onSubmit} />
        {console.log('signUp',this.state.signUp)}
        {this.state.signUp && <Redirect to="/" />}
        </>
    );
};
}

export default SignUp;
