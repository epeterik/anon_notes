//app imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//import CSS
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//app imports
import Note from '../containers/note';

class NoteDisplay extends Component {

  render() {
    //console.log("NoteDisplay - Render");
    //console.log("NoteDispaly Props: ", this.props);
 
    //get the passed in Note ID from the parameters
    let localNoteId = this.props.match.params.noteId;

    return (
        <div>
            <div className="bg-off-white padding-medium">
                <div className="row text-right">
                    <h3><Link to="/">Go Home</Link></h3>
                </div>
                <div className="row">
                    &nbsp;
                </div>
                <h1 className="padding-bottom-medium">Note ID #{localNoteId}</h1>
                <Note noteId={localNoteId} />
            </div>
        </div>
    );
  }
}

export default NoteDisplay;
