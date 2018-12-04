
import React from 'react';
import axios from 'axios';
import { SampleConsumer } from '../contexts/sample';
import { Redirect } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: {_id: null},
            create: false,
            update: false,
            delete: false,
            userId: localStorage.getItem('userId'),
            error: false,
            errorMessage: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);

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

    onCreate(event) {
        this.setState({
            create: true,
        })
        event.preventDefault();
    }

    onUpdate(event) {
        this.setState({
            update: true,
        })
    }

    onDelete(event) {
        axios.delete(`http://127.0.0.1:8080/posts/${this.state.board._id}`, {
            headers: { // 요청 헤더
              authorization: localStorage.getItem('isAuthenticated'),
            },
          },)
            // .then(response => response.json())
            .then(result => {
                console.log(result.data);
                if (result.data.ok) {
                    this.setState({
                        delete: true,
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
                {console.log(this.state.board)}
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
                        { this.state.board.todo }
                            {/* <%= post.content %> */}
                        </td>
                        <td>
                        { this.state.board.priority}
                            {/* <%= post.priority %> */}
                        </td>
                        <td>
                        { JSON.stringify(this.state.board.status) }
                            {/* <%= post.status %> */}
                        </td>
                        <td>
                            {this.state.board.userId === this.state.userId &&
                                 <input type="submit" value="글수정" onClick={this.onUpdate} />}
                        </td>
                        <td>
                            {this.state.board.userId === this.state.userId && 
                                <input type="submit" value="글삭제" onClick={this.onDelete} />}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <input className="submitButton" type="submit" value="글쓰기" onClick={this.onCreate} />
                {this.state.create && <Redirect to="/boards/board/create" />}
                {this.state.update && <Redirect to={`/boards/${this.state.board._id}/update`} />}
                {this.state.delete && <Redirect to="/boards" />}
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
