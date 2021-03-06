import React from 'react';
import { NavLink, /* Redirect */ } from 'react-router-dom';
import './Menu.css';
import axios from 'axios';
import { SampleConsumer } from '../contexts/sample';
import { Redirect } from 'react-router-dom';
// Fragments

const activeStyle = {
    color: 'green',
    fontSize: '2rem'
};
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: true,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };

    componentDidMount() {
        // :: 초기 값 설정
        this.setState({
            isAuthenticated: this.props.isAuthenticated,
        })
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
                if (result.data.ok) {
                    this.setState({
                        isAuthenticated: false,
                    })
                    localStorage.clear();
                    // localStorage.removeItem('test');
                    this.props.setValue(this.state.isAuthenticated);
                }
            })
            .catch(error => error);
    }

    onSubmit(event) {
        this.fetchSearchTopStories(localStorage.getItem('isAuthenticated'));
        event.preventDefault();
    }

    render() {
        const isAuthenticated = this.props.isAuthenticated;
        return (
            <>
                <nav>
                    <span className="myName">Yuni-Q</span>
                    <ul>
                        <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
                        <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                        {
                            isAuthenticated
                                ? 
                                    (<>
                                        <li>
                                            <NavLink exact to="/boards" activeStyle={activeStyle}>boards</NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to="/busStop" activeStyle={activeStyle}>busStop</NavLink>
                                        </li>
                                        <li>
                                            <button onClick={this.onSubmit}>sign out</button>
                                        </li>
                                    </>)
                                : 
                                    (<>
                                        <li>
                                            <NavLink exact to="/signIn" activeStyle={activeStyle}>sign In</NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to="/signUp" activeStyle={activeStyle}>sign Up</NavLink>
                                        </li>
                                    </>)
                        }
                        
                    </ul>
                </nav>
                <hr />
                {!isAuthenticated && <Redirect to="/signIn" />}
            </>

        );
    };
}

// :: Consumer 를 사용하여 context 값을 전달해준 컨테이너 컴포넌트
const SendsContainer = () => (
    <SampleConsumer>
        {
            ({ state, actions }) => (
                <Menu
                    isAuthenticated={state.isAuthenticated}
                    setValue={actions.setValue}
                />
            )
        }
    </SampleConsumer>
)

// :: Sends 대신에 SendsContainer 를 내보내줌
export default SendsContainer;