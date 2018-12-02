
import React from 'react';
import axios from 'axios';
// import { SampleConsumer } from '../contexts/sample';
// import { Redirect } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';

class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            error: false,
            errorMessage: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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
                    <th>id</th>
                    <th>todo</th>
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
                                <Link to={`/boards/${board._id}`}>Home</Link>
                                {/* { <a href="/posts/<%= posts[i]._id %>">Show</a> } */}
                            </td>
                            <td>
                                { <a href="/posts/<%= posts[i]._id %>/edit">Edit</a> }
                            </td>
                            <td>
                                { <button onClick={this.onSubmit}>Delete</button> }
                                {/* { <button onClick="deletePost('<%= posts[i]._id %>')">Delete</button> } */}
                            </td>
                        </tr>)
                }) }
                </tbody>
            </table>
            <input className="submitButton" type="submit" value="회원가입" onClick={this.onSubmit} />
            </>
        )
    }
};

export default Boards;
