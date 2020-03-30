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

class ProjectList extends Component {

    componentDidMount() {
        switch (this.props.location.pathname) {
            case '/string-instruments': this.props.projects(1);
                break;
            case '/wind-instruments': this.props.projects(2);
                break;
            case '/percussion-instruments': this.props.projects(3);
                break;
            case '/electronic-gear': this.props.projects(4)
                break;
            default: break;
        }
    }

    render() {
        let listedProjects;
        if (this.props.data && this.props.data.length > 0) {
            console.log('this.props', this.props)
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
ProjectList.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectList));


