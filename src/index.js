import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootElement = document.getElementById('root');

export const history = createBrowserHistory();
//applyMiddleware - can take a list of middleware's
const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)/*, logger */)));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    rootElement);

if (module.hot) {
    store.replaceReducer(rootReducer(history));
}
