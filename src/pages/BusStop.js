
import React from 'react';
import axios from 'axios';
// import { SampleConsumer } from '../contexts/sample';
import { Redirect } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';

class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('userId'),
            boards: [],
            id: null,
            cteate: false,
            update: false,
            delete: false,
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
        axios.get('http://127.0.0.1:8080/posts')
            // .then(response => response.json())
            .then(result => {
                console.log(result.data);
                if (result.data.ok) {
                    this.setState({
                        boards: result.data.result,
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

    onUpdate(id) {
        this.setState({
            update: true,
            id,
        })
    }

    onDelete(id) {
        axios.delete(`http://127.0.0.1:8080/posts/${id}`, {
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
                        boards: this.state.boards.filter(board => board._id !== id)
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
            <h1>Todo List</h1>
            {
                this.state.error ? (<div style={{ color: 'red' }}>{this.state.errorMessage}</div>): (null) 
            }
            <table className="posts">
            <tbody>
                <tr>
                    <th>id</th>
                    <th>BusStopNm</th>
                    <th>date</th>
                    <th>show</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
                { this.state.boards.map((board, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                {index}
                            </td>
                            <td>
                                { board.todo }
                            </td>
                            <td>
                                { board.date }
                            </td>
                            <td>
                                <Link to={`/boards/${board._id}`}>Show</Link>
                                {/* { <a href="/posts/<%= posts[i]._id %>">Show</a> } */}
                            </td>
                            <td>
                                {board.userId === this.state.userId &&
                                    <input type="submit" value="글수정" onClick={() => this.onUpdate(board._id)} />}
                            </td>
                            <td>
                                {board.userId === this.state.userId && 
                                    <input type="submit" value="글삭제" onClick={() => this.onDelete(board._id)} />}
                            </td>
                        </tr>)
                }) }
                </tbody>
            </table>
            <input className="submitButton" type="submit" value="글쓰기" onClick={this.onCreate} />
            {this.state.create && <Redirect to="/boards/board/create" />}
            {this.state.update && <Redirect to={`/boards/${this.state.id}/update`} />}
            </>
        )
    }
};

export default Boards;
