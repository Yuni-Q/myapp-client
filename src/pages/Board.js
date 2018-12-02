
import React from 'react';
import axios from 'axios';
import { SampleConsumer } from '../contexts/sample';
// import { Redirect } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            error: false,
            errorMessage: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };

    componentDidMount() {
        console.log(this.props.match.params.boardId);
        axios.get(`http://127.0.0.1:8080/posts/${this.props.match.params.boardId}`)
            // .then(response => response.json())
            .then(result => {
                console.log(result.data);
                if (result.data.ok) {
                    this.setState({
                        board: result.data.result[0],
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
            <h1>Todo List</h1>
            {
                this.state.error ? (<div style={{ color: 'red' }}>{this.state.errorMessage}</div>): (null) 
            }
            <table className="posts">
            <tbody>
            <tr>
                    <th>todo</th>
                    <th>date</th>
                    <th>content</th>
                    <th>priority</th>
                    <th>status</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>

                <tr>
                    <td>
                        { this.state.board.todo }
                        {/* <%= post.todo %> */}
                    </td>
                    <td>
                    { this.state.board.date }
                        {/* <%= post.date %> */}
                    </td>
                    <td>
                    { this.state.board.content }
                        {/* <%= post.content %> */}
                    </td>
                    <td>
                    { this.state.board.priority}
                        {/* <%= post.priority %> */}
                    </td>
                    <td>
                    { this.state.board.status }
                        {/* <%= post.status %> */}
                    </td>
                    <td>
                        {console.log('userId',this.props.userId)}
                        {this.state.board._id === this.props.userId && <a href="/posts/<%= post._id %>/edit">수정</a>}
                    </td>
                    <td>
                        {this.state.board._id === this.props.userId && <button onclick="deletePost('<%= post._id %>')">삭제</button>}
                    </td>
                </tr>
                </tbody>
            </table>
            <input className="submitButton" type="submit" value="회원가입" onClick={this.onSubmit} />
            </>
        )
    }
};

// :: Consumer 를 사용하여 context 값을 전달해준 컨테이너 컴포넌트
const SendsContainer = (props) => (
    <SampleConsumer>
        {
            ({ state, actions }) => (
                <Board
                    isAuthenticated={state.isAuthenticated}
                    userId={state.userId}
                    setValue={actions.setValue}
                    {...props}
                />
            )
        }
    </SampleConsumer>
)

// :: Sends 대신에 SendsContainer 를 내보내줌
export default SendsContainer;
