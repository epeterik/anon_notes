import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getListOfNotes } from '../actions/actions';
import Note from './note';

class NotesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false,
            sortNotesBy: "Date"
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        this.renderMySort = this.renderMySort.bind(this);
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

    componentDidMount() {
        console.log("Entering componentDidMount");
        this.props.retrieveNotes(this.handleWaitSpinner, this.handleError);
        console.log("Leaving componentDidMount");
    }

    formatNotesListMap(noteObject, arrayIndex) {

        return (
            <tr key={"noteObjectRenderRow" + arrayIndex}>
                <td key={"noteObjectRenderCell" + arrayIndex}>
                    <Note noteId={noteObject.id} />
                </td>
            </tr>
        ); //end return

    } //end formatNotesListMap()

    sortArrayByDateTime(firstElement, secondElement) {
        return secondElement.createdAt - firstElement.createdAt;
    }

    sortArrayByVotes(firstElement, secondElement) {
        let firstElementVoteScore = firstElement.upVote + firstElement.downVote;
        let secondElementVoteScore = secondElement.upVote + secondElement.downVote;
        return secondElementVoteScore - firstElementVoteScore;
    }

    setSortState(sortBy) {
        this.setState({sortNotesBy: sortBy});
    }

    renderMySort() {
        return(
            <span>
                {this.state.sortNotesBy === "Date" ? <b><a onClick={() => this.setSortState("Date")}>Date</a></b> : <a onClick={() => this.setSortState("Date")}>Date</a>} 
                 | 
                {this.state.sortNotesBy === "Vote" ? <b><a onClick={() => this.setSortState("Vote")}>Vote</a></b> : <a onClick={() => this.setSortState("Vote")}>Vote</a>} 
            </span>
        )

    }

    render() {
        //debug
        //console.log(this.props); //comenting out as this triggers on every keystroke

        let localSortedArray = [];
        if (this.state.sortNotesBy === "Date")
        {
            localSortedArray = this.props.listOfNotes.slice().sort(this.sortArrayByDateTime);
        }
        else
        {
            localSortedArray = this.props.listOfNotes.slice().sort(this.sortArrayByVotes);
            console.log(localSortedArray);
        }

        return (

            <div>
                <div className="row text-right tableDiv">
                    Sort By: {this.renderMySort()}
                </div>
                <div className="card padding-medium">
                    {this.state.showWaitSpinner ?
                        <WaitSpinner />
                        :   
                        <div>
                            {this.state.errorText.trim() !== "" ?
                                <div className="row text-center">
                                    <span class="error">{this.state.errorText}</span>
                                </div>
                                :
                                <table className="table scrollable">
                                    <tbody style={{height: "500px"}}>
                                        { localSortedArray.map(this.formatNotesListMap) }
                                    </tbody>
                                </table>
                            }
                        </div>
                    }
                </div>
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
            retrieveNotes: (waitCallback, errorCallBack) => {
                dispatch(getListOfNotes(waitCallback, errorCallBack)); 
        } 
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotesList);