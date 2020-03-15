export const GET_STEP_MEDIAS_START = 'GET_STEP_MEDIAS_START';
export const GET_STEP_MEDIAS_SUCCESS = 'GET_STEP_MEDIAS_SUCCESS';
export const GET_STEP_MEDIAS_ERROR = 'GET_STEP_MEDIAS_ERROR';

const axios = require('axios');

export const getStepMedias = (stepId) => (dispatch) => {
    dispatch({ type: GET_STEP_MEDIAS_START, stepId });
    axios.get('api/step/medias/' + stepId)
        .then(function (response) {
            dispatch({ type: GET_STEP_MEDIAS_SUCCESS, payload: response.data, stepId });
        })
        .catch(function (error) {
            dispatch({ type: GET_STEP_MEDIAS_ERROR, payload: error, stepId });
        });
}