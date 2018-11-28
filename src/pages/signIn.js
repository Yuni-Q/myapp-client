
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { SampleConsumer } from '../contexts/sample';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuthenticated: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };

    componentDidMount() {
        // :: 초기 값 설정
        this.setState({
            isAuthenticated: this.props.isAuthenticated,
        })
        console.log('componentDidMount', this.props.isAuthenticated);
    }

    fetchSearchTopStories(email, password) {
        axios.post('http://127.0.0.1:8080/signIn', {
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
        const isAuthenticated = this.props.isAuthenticated;
        // console.log('SignIn', isAuthenticated);
        return (
            <div>
                <h1>로그인</h1>
                <table className="login">
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="email">email</label>
                            </td>
                            <td>
                                <input type="text" name="email" placeholder="email" id="email" onChange={this.handleChange} value={this.state.userName} />
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

// :: Consumer 를 사용하여 context 값을 전달해준 컨테이너 컴포넌트
const SendsContainer = () => (
    <SampleConsumer>
        {
            ({ state, actions }) => (
                <SignIn
                    isAuthenticated={state.isAuthenticated}
                    setValue={actions.setValue}
                />
            )
        }
    </SampleConsumer>
)

// :: Sends 대신에 SendsContainer 를 내보내줌
export default SendsContainer;
