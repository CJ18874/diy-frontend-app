export const GET_CHAPTER_STEPS_START = 'GET_CHAPTER_STEPS_START';
export const GET_CHAPTER_STEPS_SUCCESS = 'GET_CHAPTER_STEPS_SUCCESS';
export const GET_CHAPTER_STEPS_ERROR = 'GET_CHAPTER_STEPS_ERROR';

const axios = require('axios');

export const getChapterSteps = (chapterId) => (dispatch, getState) => {
    dispatch({ type: GET_CHAPTER_STEPS_START, chapterId });
    axios.get('api/chapter/steps/' + chapterId)
        .then(function (response) {
            dispatch({ type: GET_CHAPTER_STEPS_SUCCESS, payload: response.data, chapterId });
        })
        .catch(function (error) {
            dispatch({ type: GET_CHAPTER_STEPS_ERROR, payload: error, chapterId });
        });
}