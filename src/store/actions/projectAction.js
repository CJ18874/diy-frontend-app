export const GET_PROJECT_OWNERS_START = 'GET_PROJECT_OWNERS_START';
export const GET_PROJECT_OWNERS_SUCCESS = 'GET_PROJECT_OWNERS_SUCCESS';
export const GET_PROJECT_OWNERS_ERROR = 'GET_PROJECT_OWNERS_ERROR';
export const GET_PROJECT_MEDIA_START = 'GET_PROJECT_MEDIA_START';
export const GET_PROJECT_MEDIA_SUCCESS = 'GET_PROJECT_MEDIA_SUCCESS';
export const GET_PROJECT_MEDIA_ERROR = 'GET_PROJECT_MEDIA_ERROR';
export const GET_PROJECTS_START = 'GET_PROJECTS_START';
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR';
export const GET_PROJECT_START = 'GET_PROJECT_START';
export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
export const GET_PROJECT_ERROR = 'GET_PROJECT_ERROR';
export const GET_PROJECT_CHAPTERS_START = 'GET_PROJECT_CHAPTERS_START';
export const GET_PROJECT_CHAPTERS_SUCCESS = 'GET_PROJECT_CHAPTERS_SUCCESS';
export const GET_PROJECT_CHAPTERS_ERROR = 'GET_PROJECT_CHAPTERS_ERROR';

const axios = require('axios');

export const findByCategoryId = (categoryId) => {
    return (dispatch) => {
        //make async call to database
        dispatch({ type: GET_PROJECT_OWNERS_START });
        axios.get('api/project?categoryId=' + categoryId)
            .then(function (response) {
                dispatch({ type: GET_PROJECT_OWNERS_SUCCESS, payload: response.data, categoryId });
            })
            .catch(function (error) {
                dispatch({ type: GET_PROJECT_OWNERS_ERROR, payload: error });
            });
    }
};

export const getProjectMedia = (projectId) => (dispatch) => {
    dispatch({ type: GET_PROJECT_MEDIA_START });
    axios.get('api/media?projectId=' + projectId)
        .then(function (response) {
            dispatch({ type: GET_PROJECT_MEDIA_SUCCESS, payload: response.data });
        })
        .catch(function (error) {
            dispatch({ type: GET_PROJECT_MEDIA_ERROR, payload: error });
        });
}

export const getProjects = (categoryId, ownerId, projectId) => (dispatch, getState) => {
    dispatch({ type: GET_PROJECTS_START, categoryId, ownerId, projectId });
    axios.get('api/project/' + categoryId + '/' + ownerId + '/' + projectId)
        .then(function (response) {
            dispatch({ type: GET_PROJECTS_SUCCESS, payload: response.data, categoryId, ownerId, projectId });
        })
        .catch(function (error) {
            dispatch({ type: GET_PROJECTS_ERROR, payload: error, categoryId, ownerId, projectId });
        });
}

export const getProject = (projectId) => (dispatch) => {
    dispatch({ type: GET_PROJECT_START, projectId });
    axios.get('api/project/' + projectId)
        .then(function (response) {
            dispatch({ type: GET_PROJECT_SUCCESS, payload: response.data, projectId });
        })
        .catch(function (error) {
            dispatch({ type: GET_PROJECT_ERROR, payload: error, projectId });
        });
}

export const getProjectChapters = (projectId) => (dispatch) => {
    dispatch({ type: GET_PROJECT_CHAPTERS_START, projectId });
    axios.get('api/project/chapters/' + projectId)
        .then(function (response) {
            dispatch({ type: GET_PROJECT_CHAPTERS_SUCCESS, payload: response.data, projectId });
        })
        .catch(function (error) {
            dispatch({ type: GET_PROJECT_CHAPTERS_ERROR, payload: error, projectId });
        });
}