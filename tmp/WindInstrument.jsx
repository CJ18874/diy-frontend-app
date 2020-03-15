import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProjectMedia from './ProjectMedia'
import * as projectAction from '../store/actions/projectAction';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
});

class WindInstrument extends Component {

    componentDidMount() {
        this.props.projects(2);
    }

    render() {
        let listedProjects;
        if (this.props.data.length > 0) {
            console.log(this.props.data.length)
            listedProjects = this.props.data.map(element => {
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
}

const mapStateToProps = (state) => {
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
WindInstrument.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WindInstrument));