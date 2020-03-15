import {
    GET_CHAPTER_STEPS_START,
    GET_CHAPTER_STEPS_SUCCESS,
    GET_CHAPTER_STEPS_ERROR
} from '../actions/chapterAction'

const initState = {
    data: [],
    isLoading: false,
    error: null
}

export function getChapterSteps(state = initState, action) {
    switch (action.type) {
        case GET_CHAPTER_STEPS_START:
            state = Object.assign({}, state, { data: [], isLoading: true });
            break;
        case GET_CHAPTER_STEPS_SUCCESS:
            state = Object.assign({}, state, { data: Object.assign({}, state.data, action.payload), isLoading: false });
            break;
        case GET_CHAPTER_STEPS_ERROR:
            state = Object.assign({}, state, { error: action.payload, isLoading: false });
            break;
        default: break;
    }
    return state;
}
