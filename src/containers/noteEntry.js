import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { pushNewNoteOut } from '../actions/actions';

class NoteEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noteInput: '',
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleInputCange = this.handleInputCange.bind(this);
        this.handleAddNoteClick = this.handleAddNoteClick.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering noteEntry.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving noteEntry.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering noteEntry.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving noteEntry.handleError"); //debug
    }

    handleInputCange(event) {
        //console.log("Entering NoteEntry.handleInputDidChange");
        let localInputChange = event.target.value;
        let localInputName = event.target.name;
        //console.log("NoteEntry.handleInputDidChange for " + localInputName + " | Updated Value: " + localInputChange);
        this.setState({[localInputName]: localInputChange});
        //console.log("Leaving NoteEntry.handleInputDidChange");
    }

    handleAddNoteClick() {
        console.log("Entering handleAddNoteClick"); //debug

        this.props.postNote(this.state.noteInput, //user entered text
                            this.handleWaitSpinner, //control show/hide of wait spinner
                            this.handleError) //handle display of error text should call fail

        //clear note text if an error has not occurred
        //   if error occurs leave value as it will make it easier for the user to try again...
        if (this.state.errorText.trim() === "")
        {
            this.setState({noteInput: ''});
        }

        console.log("Leaving handleAddNoteClick"); //debug
    }

    render() {
        //debug
        //console.log(this.props); //comenting out as this triggers on every keystroke

        return (

            <div className="card padding-medium">
                {this.state.showWaitSpinner ?
                    <WaitSpinner />
                    :   
                    <div>
                        <div className="row">
                            <div className="small-10 columns md-text-field with-floating-label">
                                <input type="text" id="anon_note_input" required name="noteInput" value={this.state.noteInput} onChange={this.handleInputCange} />
                                <label htmlFor="anon_note_input">Note</label>
                            </div>
                            <div className="small-2 columns">
                                <button onClick={this.handleAddNoteClick} className="button btn-cta success small" disabled={this.state.noteInput.length < 3 ? true : false}>Add Note</button>
                            </div>
                        </div>
                        {this.state.errorText.trim() !== "" ?
                            <div className="row text-center">
                                <span class="error">{this.state.errorText}</span>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end NoteEntry

const mapStateToProps = (state) => {
    return {
        //listOfGitHubBattlePlayers: state.gitHubBattleParticipants
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            postNote: (noteText, waitCallback, errorCallBack) => {
                dispatch(pushNewNoteOut(noteText, waitCallback, errorCallBack)); 
        } 
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(NoteEntry);