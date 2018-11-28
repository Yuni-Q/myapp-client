import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About, SignIn, SignUp } from 'pages';
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
                </div>
            </SampleProvider>
        );
    }
}

export default App;