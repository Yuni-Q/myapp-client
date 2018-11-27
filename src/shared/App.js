import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About, signIn, signUp } from 'pages';
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
                    <Route path="/signIn" component={signIn} />
                    <Route path="/signUp" component={signUp} />
                </div>
            </SampleProvider>
        );
    }
}

export default App;