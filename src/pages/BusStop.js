
import React from 'react';
import axios from 'axios';
// import { SampleConsumer } from '../contexts/sample';
import { Redirect } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';

class BusStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            busStopName: '',
            busStopTime: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onSubmit() {
        axios.get(`http://127.0.0.1:8080/busses/busStop/${this.state.busStopName}`, {
            headers: { // 요청 헤더
              authorization: localStorage.getItem('isAuthenticated'),
            },
          },)
            // .then(response => response.json())
            .then(result => {
                console.log(result.data.result);
                if (result.data.ok) {
                    this.setState({
                        busStopTime: result.data.result,
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <>
            <h1>Bus Stop</h1>
            {
                this.state.error ? (<div style={{ color: 'red' }}>{this.state.errorMessage}</div>): (null) 
            }
            <table className="post">
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="busStopName">BusStopName</label>
                        </td>
                        <td>
                        <input type="text" name="busStopName" placeholder="busStopName" id="busStopName" onChange={this.handleChange} value={this.state.busStopName}/>
                        </td>
                    </tr>
                </tbody>
                
            </table>
            <input className="submitButton" type="submit" value="조회" onClick={this.onSubmit} />
            <table className="posts">
            <tbody>
                <tr>
                    <th>Index</th>
                    <th>BusStopNm</th>
                    <th>Info</th>
                </tr>
                { Object.keys(this.state.busStopTime).map((number, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                {index}
                            </td>
                            <td>
                                { number }
                            </td>
                            <td>
                                { this.state.busStopTime[number].map((info, index2) => {
                                    return (
                                        <>
                                            <p key={index2}>{JSON.stringify(info)}</p>
                                        </>
                                    )
                                })
                                }
                            </td>
                        </tr>)
                }) }
                </tbody>
            </table>
            </>
        )
    }
};

export default BusStop;
