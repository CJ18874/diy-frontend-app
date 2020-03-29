import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconHome from '@material-ui/icons/Home';
import Zoom from '@material-ui/core/Zoom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -10,
        marginRight: 10,
    },
});

export class NavMenu extends Component {
    displayName = NavMenu.name

    state = {
        anchorEl: null,
    };

    handlePopperOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopperClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Button component={Link} to="/" title="Home" color="inherit"><IconHome /></Button>
                    <div onMouseLeave={this.handlePopperClose}>
                        <Button
                            aria-owns={this.state.anchorEl ? 'mouse-over-popover' : undefined}
                            onMouseEnter={this.handlePopperOpen}
                            onClick={this.handlePopperOpen}
                            color="inherit"
                            size="large"
                            className={classes.menuButton}>
                            <Typography variant="h6" color="inherit" >Category</Typography>
                        </Button>
                        <Popper id="mouse-over-popover"
                            open={Boolean(this.state.anchorEl)}
                            anchorEl={this.state.anchorEl}
                            placement="bottom-start">
                            <Zoom in={true}>
                                <Paper >
                                    <MenuList id="simple-menu">
                                        <MenuItem onClick={this.handlePopperClose} component={Link} to="/string-instruments">
                                            <Typography variant="h6" >String Instruments</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={this.handlePopperClose} component={Link} to="/wind-instruments">
                                            <Typography variant="h6" >Wind Instruments</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={this.handlePopperClose} component={Link} to="/percussion-instruments">
                                            <Typography variant="h6" >Percussion Instruments</Typography></MenuItem>
                                        <Divider />
                                        <MenuItem onClick={this.handlePopperClose} component={Link} to="/electronic-gear" >
                                            <Typography variant="h6" >Electronic Gear</Typography>
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                            </Zoom>
                        </Popper>
                    </div>
                    <div className={classes.grow} />
                    <IconButton aria-label="Menu" color="inherit" title="Sign In" component={Link} to="/signin">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
                {this.props.isLoading ? <LinearProgress color="secondary" variant="query" /> : ""}
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.projects.isLoading,
    }
}


NavMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    //isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(NavMenu));