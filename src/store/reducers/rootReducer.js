import * as ProjectReducer from './projectReducer';
import * as ChapterReducer from './chapterReducer';
import * as StepReducer from './stepReducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    projects: ProjectReducer.findByCategoryId,
    projectMedia: ProjectReducer.getProjectMedia,
    //projects: ProjectReducer.getProjects,
    //project: ProjectReducer.getProject,
    projectChapters: ProjectReducer.getProjectChapters,
    chapterSteps: ChapterReducer.getChapterSteps,
    stepMedias: StepReducer.getStepMedias
});

export default rootReducer;