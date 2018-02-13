//default
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//package imports
import { Provider } from 'react-redux';
import { 
    BrowserRouter,
    Route
    } from 'react-router-dom';

//app imports
import store from './store/store'; //import the store from our store directory
import NoteDisplay from './components/noteDisplay';

//wrap our app in the Provider that is tied to our store
ReactDOM.render(
    <Provider store={ store }> 
        <BrowserRouter>
            <div>
                <Route exact path="/" component={ App } />
                <Route exact path="/notes/:noteId" component={ NoteDisplay } />
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

registerServiceWorker();