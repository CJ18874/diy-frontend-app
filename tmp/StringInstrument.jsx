import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as projectAction from '../store/actions/projectAction';
import ProjectMedia from './ProjectMedia'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
});

class StringInstrument extends Component {

    componentDidMount() {
        this.props.projects(1);
    }

    render() {
        let listedProjects;
        if (this.props.data.length > 0) {
            listedProjects = this.props.data.map(element => {
                return (
                    <Grid item xs={6} sm={3} key={element.id}>
                        <ProjectMedia
                            ownerName={element.ownerName}
                            projectTitle={element.title}
                            mediaList={element.mediaList} />
                    </Grid>
                );
            })
        };

        return (
            <div style={{ padding: 20 }}>
                <Grid container spacing={3} >
                    {listedProjects}
                </Grid>
            </div>
        );
    }
}

//Get the state of the store
const mapStateToProps = (state) => {
    //Return and object that represent the diffrentt properties that I want to add to the prop
    return {
        data: state.projects.data,
        isLoading: state.projects.isLoading,
        error: state.projects.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        projects: (categoryId) => dispatch(projectAction.findByCategoryId(categoryId))
    }
}

//PropTypes defines type and which props are required.
StringInstrument.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StringInstrument));


