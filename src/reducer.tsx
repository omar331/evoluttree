import { combineReducers } from 'redux';


function contentOperations(state = [], action) {
    switch (action.type) {
        case 'NEW_CONTENT':
            return [
                ...state,
                {
                    foo: 'bar'
                }
            ]
        default:
            return state
    }
}


const rootReducer = combineReducers({
    contentOperations
});

export default rootReducer;