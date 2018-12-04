
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About, SignIn, SignUp, Boards, Board, BoardCreate, BoardUpdate } from 'pages';
import Menu from 'components/Menu';
import { SampleProvider } from '../contexts/sample';

class App extends Component {
    render() {
        return (
            <SampleProvider>
                <div className="panes">
                    <Menu />
                    <Route exact path="/" component={Home} />
                    {/* <Switch> */}
                    {/* <Route path="/about/:name" component={About}/> */}
                    <Route path="/about" component={About} />
                    {/* </Switch> */}
                    <Route path="/signIn" component={SignIn} />
                    <Route path="/signUp" component={SignUp} />
                    
                    <Route exact path="/boards" component={Boards} />
                    
                    <Route exact path="/boards/board/create" component={BoardCreate} />
                    <Route exact path="/boards/:boardId/update" component={BoardUpdate} />
                    <Route exact path="/boards/:boardId" component={Board} />
                </div>
            </SampleProvider>
        );
    }
}

export default App;