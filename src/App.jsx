import React from 'react';
import { Route } from 'react-router-dom'
import Layout from './components/Layout';
import { Home } from './components/Home';
import ProjectList from './components/ProjectList';
import SignIn from './components/SignIn';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
    return (
        <div>
            <CssBaseline />
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/string-instruments" component={ProjectList} />
                <Route path="/wind-instruments" component={ProjectList} />
                <Route path="/percussion-instruments" component={ProjectList} />
                <Route path="/electronic-gear" component={ProjectList} />
                <Route path="/signin" component={SignIn} />
            </Layout>
        </div>
    );
}
export default App;