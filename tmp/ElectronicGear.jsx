import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import UsersListedItems from './UsersListedItems';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as itemAction from '../store/actions/projectAction';

class ElectronicGear extends Component {

    componentDidMount() {
        this.props.getProjectOwners(4);
    }

    render() {

        if (this.props.error) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <CircularProgress />;
        }

        var usersListedItems;
        let dataObject = this.props.data[4];
        if (dataObject !== undefined) {
            usersListedItems = dataObject.map(element => {
                return (
                    <Grid item xs={6} sm={3} key={element.projectId}>
                        <UsersListedItems
                            categoryId={4}
                            ownerId={element.ownerId}
                            userName={element.userName}
                            projectId={element.projectId}>
                        </UsersListedItems>
                    </Grid>
                );
            })
        }

        return (
            <div style={{ padding: 20 }}>
                <Grid container spacing={3}>
                    {usersListedItems}
                </Grid>
            </div>
        );
    }
}

//Get the state of the store
const mapStateToProps = (state) => {
    return {
        data: state.projectOwner.data,
        isLoading: state.projectOwner.isLoading,
        error: state.projectOwner.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectOwners: (categoryId) => dispatch(itemAction.getProjectOwners(categoryId))
    }
}

ElectronicGear.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectronicGear);