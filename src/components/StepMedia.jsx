import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as chapterAction from '../store/actions/chapterAction';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Stepper from '@material-ui/core/Stepper';
import MaterialStep from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core/StepConnector';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';

const useStyles = makeStyles(theme => ({
    connectorActive: {
        '& $connectorLine': {
            borderColor: theme.palette.secondary.main,
        },
    },
    connectorCompleted: {
        '& $connectorLine': {
            borderColor: theme.palette.primary.main,
        },
    },
    connectorDisabled: {
        '& $connectorLine': {
            borderColor: theme.palette.grey[100],
        },
    },
    connectorLine: {
        transition: theme.transitions.create('border-color'),
    },
}));

function StepMedia(props) {

    const classes = useStyles();

    const dispatch = useDispatch();
    const getChapterSteps = useCallback((chapterId) => dispatch(chapterAction.getChapterSteps(chapterId)), [dispatch]);
    useEffect(() => getChapterSteps(props.chapterId), [getChapterSteps, props.chapterId]);
    //const getChapterSteps = useCallback((chapterId) => dispatch(chapterAction.getChapterSteps(chapterId)), []);

    const [activeStep, setActiveStep] = useState(0);
    const [setStepId] = useState(0);
    const handleStep = (index, stepId) => () => {
        setActiveStep(index);
        setStepId(stepId);
    };

    const isLoading = useSelector(state => state.chapterSteps.isLoading);
    const data = useSelector(state => state.chapterSteps.data);
    useEffect(() => {
        let dataValues = Object.values(data);
        if (dataValues.length > 0) {
            setStepId(dataValues[0].stepId);
        }
    });
    if (isLoading) {
        return <CircularProgress />;
    }

    const connector = (
        <StepConnector
            classes={{
                active: classes.connectorActive,
                completed: classes.connectorCompleted,
                disabled: classes.connectorDisabled,
                line: classes.connectorLine,
            }}
        />
    );

    return (
        <div>
            <Grid container>
                <Grid item xs>
                    <Stepper nonLinear activeStep={activeStep} connector={connector} orientation="vertical">
                        {Object.values(data).map((element, index) => (
                            <MaterialStep key={index}>
                                <StepButton onClick={handleStep(index, element.stepId)}>
                                    {element.header}
                                </StepButton>
                                <StepContent>
                                    <Typography>{element.description}</Typography>
                                </StepContent>
                            </MaterialStep>
                        ))}
                    </Stepper>
                </Grid>
                <Grid item xs>

                    <MobileStepper steps={Object.values(data).length} />
                </Grid>
            </Grid>
        </div>
    )
}

export default StepMedia;