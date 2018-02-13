//package imports
import axios from 'axios';

//app imports
import { GET_ANONYMOUS_NOTES, 
         ADD_ANONYMOUS_NOTE,
         UPDATE_ANONYMOUS_NOTE_LIST } from './types';

export function getAnonymousNotes() {
    return {
        type: GET_ANONYMOUS_NOTES,
        payload: {}
    }
}

export function sendAnonymousNote() {
    return {
        type: ADD_ANONYMOUS_NOTE,
        payload: {}
    }
}

export function updateAnonymousNoteList(listOfNotes) {
    return {
        type: UPDATE_ANONYMOUS_NOTE_LIST,
        payload: listOfNotes
    }
}

export function getListOfNotes (waitFlag, errorFunction)
{
    console.log("Entering getListOfNotes");

    //specify local mockAPI path
    let mockAPIPath = "http://5a830fae98bd81001246c8ba.mockapi.io/anonymousNote/";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPath)
            .then((response) => {
                //Success!! :)
                console.log("getListOfNotes - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(updateAnonymousNoteList(response.data));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getListOfNotes :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting list of users from MockAPI, Try Again'));
            })

    } //end return

} //end of getListOfNotes

export function pushNewNoteOut (noteText, waitFlag, errorFunction)
{
    console.log("Entering pushNewNoteOut");

    let mockAPIPath = "http://5a830fae98bd81001246c8ba.mockapi.io/anonymousNote/";

    return (dispatch) => {
        //set waitFlag to true to display the waitflag in the UI
        dispatch(() => waitFlag(true));

        //create local object for data to send to MockAPI
        let anonymousNoteObject = {
            note: noteText,
            upVote: 0,
            downVote: 0
        };

        //debug - lets see what we're sending
        console.log(anonymousNoteObject);

        axios.post(mockAPIPath, anonymousNoteObject)
            .then((response) => {
                //Success!! :)
                console.log("mockAPI Post - response: ", response);

                //set state var to turn off wait spinner
                //dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(getListOfNotes(waitFlag, errorFunction));
                //dispatch(() => successFunction(playerData));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to pushed user to mockAPI - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //send error text back up to the UI - should be more descriptive... but time
                dispatch(() => errorFunction('Error pushing user to MockAPI, Try Again'));
            })

            //debug
            console.log("Leaving pushNewNoteOut");

    } //end return

} //end of pushNewNoteOut

export function updateNoteVote (noteId, newDownVote, newUpVote, waitFlag, errorFunction)
{
    console.log("Entering updateNoteVote");

    let mockAPIPath = "http://5a830fae98bd81001246c8ba.mockapi.io/anonymousNote/";

    console.log("updateNoteVote - after setting API path");

    return (dispatch) => {
        console.log("updateNoteVote - in return");

        //set waitFlag to true to display the waitflag in the UI
        dispatch(() => waitFlag(true));

        //create local object for data to send to MockAPI
        let noteVoteUpdateObject = {
            id: noteId,
            upVote: newUpVote,
            downVote: newDownVote
        };

        //debug - lets see what we're sending
        console.log(noteVoteUpdateObject);

        //call mockAPI with path and NOTE ID
        axios.put(mockAPIPath + noteId, noteVoteUpdateObject)
            .then((response) => {
                //Success!! :)
                console.log("mockAPI Post - response: ", response);

                //set state var to turn off wait spinner
                //dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(getListOfNotes(waitFlag, errorFunction));
                //dispatch(() => successFunction(playerData));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to update Note Vote - mockAPI - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //send error text back up to the UI - should be more descriptive... but time
                dispatch(() => errorFunction('Error Registering Vote, Please Try Again'));
            })

            //debug
            console.log("Leaving updateNoteVote");

    } //end return

} //end of updateNoteVote