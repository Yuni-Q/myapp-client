
import React from 'react';
import axios from 'axios';
import { SampleConsumer } from '../contexts/sample';
import { Redirect } from 'react-router-dom';
// import { Link, Route } from 'react-router-dom';
import moment from 'moment';

class BoardCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            date: '',
            todo: '',
            content: '',
            priority: 0,
            status: false,
            update: false,
            error: false,
            errorMessage: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };

    componentDidMount() {
        console.log(this.props.match.params.boardId);
        axios.get(`http://127.0.0.1:8080/posts/${this.props.match.params.boardId}`)
            // .then(response => response.json())
            .then(result => {
                console.log('aaaaaaaa', result.data.result);
                if (result.data.ok) {
                    this.setState({
                        id: result.data.result[0]._id,
                        date: result.data.result[0].date,
                        todo: result.data.result[0].todo,
                        content: result.data.result[0].content,
                        priority: result.data.result[0].priority,
                        status: result.data.result[0].status,
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

    fetchSearchTopStories(date, todo, content, priority, status,) {
        axios.put(`http://127.0.0.1:8080/posts/${this.state.id}`, {
          date, todo, content, priority, status,
        }, 
        {
          headers: { // 요청 헤더
            authorization: localStorage.getItem('isAuthenticated'),
          },
        },
      )
            // .then(response => response.json())
            .then(result => {
                console.log(result.data);
                if (result.data.ok) {
                    this.setState({
                        update: true,
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
        const { 
          date,
          todo,
          content,
          priority,
          status,
        } = this.state;
        this.fetchSearchTopStories(date, todo, content, priority, status,);
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

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    render() {
        return (
            <>
            {console.log(moment().format('YYYY.MM.DD'))};
            <h1>Todo List</h1>
            {
                this.state.error ? (<div style={{ color: 'red' }}>{this.state.errorMessage}</div>): (null) 
            }
            <table className="post">
              <tbody>
                <tr>
                    <td>
                        <label htmlFor="date">Date</label>
                    </td>
                    <td>
                        <input type="date" name="date" placeholder="date" id="date" onChange={this.handleChange} value={moment(this.state.date).format('YYYY-MM-DD')}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="todo">ToDo</label>
                    </td>
                    <td>
                        <input type="text" name="todo" placeholder="todo" id="todo" onChange={this.handleChange} value={this.state.todo} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="content">Content</label>
                    </td>
                    <td>
                        <input type="text" name="content" placeholder="content" id="content" onChange={this.handleChange} value={this.state.content} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="priority">priority</label>
                    </td>
                    <td>
                        <input type="number" name="priority" placeholder="priority" id="priority" onChange={this.handleChange} value={this.state.priority} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="status">status</label>
                    </td>
                    <td>
                      <input
                        name="status"
                        type="checkbox"
                        checked={this.state.status}
                        onChange={this.handleInputChange} 
                      />
                        {/* <input type="checkbox" name="status" placeholder="status" id="status" value="true" onChange={this.handleChange}/> */}
                    </td>
                </tr>
                </tbody>
            </table>
            <input className="submitButton" type="submit" value="수정" onClick={this.onSubmit} />
            {this.state.update && <Redirect to="/boards" />}
            </>
        )
    }
};

// :: Consumer 를 사용하여 context 값을 전달해준 컨테이너 컴포넌트
const SendsContainer = (props) => (
    <SampleConsumer>
        {
            ({ state, actions }) => (
                <BoardCreate
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
