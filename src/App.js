import React, { Component } from 'react';

//import CSS
import './ui-toolkit/css/nm-cx/main.css';
import './css/custom.css'

//app imports
import NoteEntry from './containers/noteEntry';
import NotesList from './containers/notesList';

class App extends Component {
  render() {
    return (
      <div className="bg-off-white padding-medium">
        <h1 className="padding-bottom-medium">Anonymous Notes</h1>
        <NoteEntry />
        <div className="row">
          &nbsp;
        </div>
        <div className="row">
          <div className="card padding-medium">
            <NotesList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
