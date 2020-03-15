import {
    GET_PROJECT_OWNERS_START,
    GET_PROJECT_OWNERS_SUCCESS,
    GET_PROJECT_OWNERS_ERROR,
    GET_PROJECT_MEDIA_START,
    GET_PROJECT_MEDIA_SUCCESS,
    GET_PROJECT_MEDIA_ERROR,
    GET_PROJECTS_START,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR,
    GET_PROJECT_START,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,
    GET_PROJECT_CHAPTERS_START,
    GET_PROJECT_CHAPTERS_SUCCESS,
    GET_PROJECT_CHAPTERS_ERROR
} from '../actions/projectAction'

const initState = {
    data: [],
    isLoading: false,
    error: null
}

export function findByCategoryId(state = initState, action) {
    switch (action.type) {
        case GET_PROJECT_OWNERS_START:
            state = Object.assign({}, state, { data: [], isLoading: true });
            break;
        case GET_PROJECT_OWNERS_SUCCESS:
            state = { ...state, data: action.payload, isLoading: false };

            //state = Object.assign({}, state, { data: Object.assign({}, state.data, { [key]: action.payload }), isLoading: false });
            break;
        case GET_PROJECT_OWNERS_ERROR:
            state = Object.assign({}, state, { error: action.payload, isLoading: false });
            break;
        default: break;
    }
    return state;
}

export function getProjectMedia(state = initState, action) {
    // const key = `${action.projectId}`; // unique key for the payload
    switch (action.type) {
        case GET_PROJECT_MEDIA_START:
            state = Object.assign({}, state, { data: [], isLoading: true });
            break;
        case GET_PROJECT_MEDIA_SUCCESS:
            state = { ...state, data: action.payload, isLoading: false };
            break;
        case GET_PROJECT_MEDIA_ERROR:
            state = Object.assign({}, state, { error: action.payload, isLoading: false });
            break;
        default: break;
    }
    return state;
}

export function getProjects(state = initState, action) {
    const key = `${action.categoryId}%${action.ownerId}%${action.projectId}`; // unique key for the payload
    switch (action.type) {
        case GET_PROJECTS_START:
            state = Object.assign({}, state, { data: [], isLoading: true });
            break;
        case GET_PROJECTS_SUCCESS:
            state = Object.assign({}, state, { data: Object.assign({}, state.data, { [key]: action.payload }), isLoading: false });
            break;
        case GET_PROJECTS_ERROR:
            state = Object.assign({}, state, { error: action.payload, isLoading: false });
            break;
        default: break;
    }
    return state;
}

export function getProject(state = initState, action) {
    switch (action.type) {
        case GET_PROJECT_START:
            state = Object.assign({}, state, { data: [], isLoading: true });
            break;
        case GET_PROJECT_SUCCESS:
            state = Object.assign({}, state, { data: Object.assign({}, state.data, action.payload), isLoading: false });
            break;
        case GET_PROJECT_ERROR:
            state = Object.assign({}, state, { error: action.payload, isLoading: false });
            break;
        default: break;
    }
    return state;
}

export function getProjectChapters(state = initState, action) {
    switch (action.type) {
        case GET_PROJECT_CHAPTERS_START:
            state = Object.assign({}, state, { data: [], isLoading: true, error: null });
            break;
        case GET_PROJECT_CHAPTERS_SUCCESS:
            state = Object.assign({}, state, { data: Object.assign({}, state.data, action.payload), isLoading: false });
            break;
        case GET_PROJECT_CHAPTERS_ERROR:
            state = Object.assign({}, state, { error: action.payload, isLoading: false });
            break;
        default: break;
    }
    return state;
}