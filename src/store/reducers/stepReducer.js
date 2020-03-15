import {
    GET_STEP_MEDIAS_START,
    GET_STEP_MEDIAS_SUCCESS,
    GET_STEP_MEDIAS_ERROR
} from '../actions/stepAction'

const initState = {
    data: [],
    isLoading: false,
    error: null
}

export function getStepMedias(state = initState, action) {
    switch (action.type) {
        case GET_STEP_MEDIAS_START:
            state = Object.assign({}, state, { data: [], isLoading: true });
            break;
        case GET_STEP_MEDIAS_SUCCESS:
            state = Object.assign({}, state, { data: Object.assign({}, state.data, action.payload), isLoading: false });
            break;
        case GET_STEP_MEDIAS_ERROR:
            state = Object.assign({}, state, { error: action.payload, isLoading: false });
            break;
        default: break;
    }
    return state;
}
