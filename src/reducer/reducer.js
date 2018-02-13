//app imports
import { GET_ANONYMOUS_NOTES, 
         ADD_ANONYMOUS_NOTE,
         UPDATE_ANONYMOUS_NOTE_LIST } from '../actions/types';

export const reducer = (state, action) => {

    console.log("Entering Reducer");

    switch (action.type) {
    case GET_ANONYMOUS_NOTES: 
        console.log("reducer - GET_ANONYMOUS_NOTES");
        return state; 
    case ADD_ANONYMOUS_NOTE: 
        console.log("reducer - ADD_ANONYMOUS_NOTE");
        return state; 
    case UPDATE_ANONYMOUS_NOTE_LIST:
        console.log("reducer - UPDATE_ANONYMOUS_NOTE_LIST");
        state = { ...state,
                  anonymousNotesList: action.payload.slice() }
        return state;
    default: //if no case is caught, return the current unmodified state
        console.log("reducer - default");
        return state; 

    } //end switch

} //end of reducer

//only exporting one element as the default element
export default reducer;