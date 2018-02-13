import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//package imports
import { connect } from "react-redux";
import { 
    Link
    } from 'react-router-dom';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { convertSecondsToDate } from '../actions/utility';
import { updateNoteVote } from '../actions/actions';

class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        this.noteArrayFindNote = this.noteArrayFindNote.bind(this);
        this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
        this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
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

    noteArrayFindNote (noteObject) {
        //return true when found
        //console.log("Current find note object", noteObject);
        return (noteObject.id === this.props.noteId)
    }

    handleUpVoteClick(noteObject) {
        //console.log("Entering handleUpVoteClick");
        //console.log(noteObject);
        this.props.updateVotes(noteObject.id, noteObject.downVote, noteObject.upVote + 1, this.handleWaitSpinner, this.handleError);
        //console.log("Leaving handleUpVoteClick");
    }

    handleDownVoteClick(noteObject) {
        //console.log("Entering handleDownVoteClick");
        //console.log(noteObject);
        this.props.updateVotes(noteObject.id, noteObject.downVote - 1, noteObject.upVote, this.handleWaitSpinner, this.handleError);
        //console.log("Leaving handleDownVoteClick");
    }

    render() {
        //debug
        //console.log("Note Object Props: ", this.props); //comenting out as this triggers on every keystroke

        //Error handling, check to see if the notes array has been loaded
        if (this.props.listOfNotes.length === 0)
        {
            return <div>No Note Data To Display - Array Unloaded, go to home page for fresh app load.</div>
        }

        let localNoteObject = this.props.listOfNotes.find(this.noteArrayFindNote);
        let localVoteResult = localNoteObject.upVote + localNoteObject.downVote;

        return (
            
            <div className="card padding-medium" key={"noteObjectRenderCard" + localNoteObject.id} >
                {this.state.showWaitSpinner ?
                    <div className="text-center">
                        <h3>Updating Note With Vote!!</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    <div> 
                        <div className="row text-right tableDiv" key={"noteObjectRenderTime" + localNoteObject.id} >
                            Noted on: { convertSecondsToDate(localNoteObject.createdAt) }
                        </div>
                        <div className="row">
                            &nbsp;
                        </div>
                        <div className="row">
                            <div className="small-9 columns tableDiv">
                                <Link to={"/notes/" + localNoteObject.id}>{localNoteObject.note}</Link>
                            </div>
                            <div className="small-1 columns">
                                <div className="row text-center">
                                    <h2>Votes:</h2>
                                    <h3 style={localVoteResult >= 0 ? {color: "green"} : {color: "red"}}>{localVoteResult}</h3>
                                    {/* icons taken from: https://emojipedia.org/thumbs-up-sign/ | https://emojipedia.org/thumbs-down-sign/ */}
                                    <span style={{color: "green"}}>👍 {localNoteObject.upVote}</span><b> | </b><span style={{color: "red"}}>👎 {localNoteObject.downVote}</span>
                                </div>
                            </div>
                            <div className="small-2 columns">
                                <div className="row text-center">
                                    <button className="button btn-cta success tiny" onClick={() => this.handleUpVoteClick(localNoteObject)}>Up Vote</button>
                                </div>
                                <div className="row text-center">
                                    <button className="button btn-cta alert tiny" onClick={() => this.handleDownVoteClick(localNoteObject)}>Down Vote</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end NoteEntry

const mapStateToProps = (state) => {
    return {
        listOfNotes: state.anonymousNotesList
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            updateVotes: (noteId, newDownVote, newUpVote, waitCallback, errorCallBack) => {
                dispatch(updateNoteVote (noteId, newDownVote, newUpVote, waitCallback, errorCallBack))
        } 
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Note);