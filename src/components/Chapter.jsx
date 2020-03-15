import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as projectAction from '../store/actions/projectAction';
import { makeStyles } from '@material-ui/core/styles';
import { useTransition, animated } from 'react-spring';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import StepMedia from '../components/StepMedia';

const useStyles = makeStyles(theme => ({
    paper: {
        borderRadius: '12px',
        border: '1.5px solid',
        borderColor: '#7F00FF',
        marginBottom: '14px',
        position: 'absolute',
        width: '100%'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(2),
        color: '#7F00FF',
    },
    fab: {
        margin: theme.spacing(1),
        color: theme.palette.common.white,
        backgroundColor: '#7F00FF',
        '&:hover': {
            backgroundColor: '#7200e6',
        },
    },
    img: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
}));


function Chapter(props) {

    const classes = useStyles();

    const dispatch = useDispatch();
    const getProjectChapters = useCallback((projectId) => dispatch(projectAction.getProjectChapters(projectId)), [dispatch]);
    useEffect(() => getProjectChapters(props.projectId), [getProjectChapters, props.projectId]);

    const [raised, setRaised] = useState(false);
    const onMouseEnter = () => setRaised(true)
    const onMouseLeave = () => setRaised(false)

    const [activeChapter, setActiveChapter] = useState(0);
    /**
     * Pass an inline callback and an array of dependencies. 
     * useCallback will return a memoized version (In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again)
     * of the callback that only changes if one of the dependencies has changed. 
     * This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).
     **/
    const onClick = useCallback(() => {
        document.body.style.overflowX = "hidden";
        setActiveChapter(activeChapter => (activeChapter + 1) % Object.keys(data).length)
    }, [])

    // Perform transition to the activeChapter
    // translate3d(tx, ty, tz)
    const transitions = useTransition(activeChapter, p => p, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 1, transform: 'translate3d(-105%,0,0)' },
    })

    const error = useSelector(state => state.projectChapters.error);
    const isLoading = useSelector(state => state.projectChapters.isLoading);
    const data = useSelector(state => state.projectChapters.data);
    if (error) {
        return <p>No chapters where created</p>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        // item - item is actually the current activeStep
        // props - props is the transitions props
        <div>
            {transitions.map(({ item, props, key }) => {
                const chapter = data[item]
                if (chapter) {
                    return (
                        <animated.div style={props} key={key}>
                            <Card className={classes.paper}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                raised={raised}>
                                <Typography className={classes.header} variant="h5">
                                    {chapter.title}
                                </Typography>

                                <StepMedia chapterId={chapter.chapterId} />


                                <Grid container direction="row" justify="flex-end">
                                    <Grid item >
                                        <Fab className={classes.fab} onClick={onClick}>
                                            <SkipNextIcon />
                                        </Fab>
                                    </Grid>
                                </Grid>
                            </Card>
                        </animated.div>)
                }
            })}
            <Box component="span" m={1} />
        </div>
    );
}

export default Chapter;