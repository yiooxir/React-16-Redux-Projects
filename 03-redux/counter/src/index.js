import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

var rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

//middleware

const logger = (store) => {
    return (next) => {
        return (action) => {
            console.log('[Middleware] dispatching' + JSON.stringify(action));
            const result = next(action);
            console.log('[Middleware] next state' + JSON.stringify(store.getState()));
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//redux store creation
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
