import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as projectAction from '../store/actions/projectAction';
import ProjectMedia from './ProjectMedia';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

function PercussionInstrument(props) {

    const dispatch = useDispatch();
    const projects = useCallback((categoryId) => dispatch(projectAction.findByCategoryId(categoryId)), [dispatch]);
    /**
     * Similar to componentDidMount and componentDidUpdate.
     * When you call useEffect, you’re telling React to run your “effect” function after flushing changes to the DOM.
     * 
     * The first argument is a callback that will be fired after browser layout and paint. 
     * Therefore it does not block the painting process of the browser.
     * 
     * The second argument is an array of values (usually props).
     * If any of the value in the array changes, the callback will be fired after every render.
     * When it's not present, the callback will always be fired after every render.
     * When it's an empty list, the callback will only be fired once, similar to componentDidMount.
     */
    useEffect(() => projects(3), [projects]);

    const error = useSelector(state => state.projects.error);
    const isLoading = useSelector(state => state.projects.isLoading);
    const data = useSelector(state => state.projects.data);
    if (error) {
        return <p>Sorry! There was an error loading the items</p>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    var listedProjects;
    if (data.length > 0) {
        listedProjects = data.map(element => {
            return (
                <Grid item xs={6} sm={3} key={element.id}>
                    <ProjectMedia
                        ownerName={element.ownerName}
                        projectTitle={element.title}
                        mediaList={element.mediaList}>
                    </ProjectMedia>
                </Grid>
            );
        })
    }

    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={3}>
                {listedProjects}
            </Grid>
        </div>
    );
}

export default PercussionInstrument;