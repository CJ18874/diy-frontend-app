import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CardMedia, CardPrimaryContent } from "@material/react-card";
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import yellow from '@material-ui/core/colors/yellow';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import '@material/react-card/dist/card.css';
import { Spring } from 'react-spring/renderprops';

// Inject some CSS into the DOM.
//Material-UI uses a JavaScript-based approach to theming its components called CSS-in-JS. 
//With this approach, CSS classnames are generated using JavaScript objects.If you’ve ever used React’s style prop, these objects might look familiar to you.
//In this example, styles is a function that takes the theme as a parameter and returns a style object named root.
//Camel - cased CSS keys are assigned to string or numeric values, and the theme has customizable spacing.

//When you pass a component to a function and it returns a new component, it’s called a higher-order component (HOC). 
//An abstraction over a component. When given a component(and perhaps some other parameters), they return a new component.
const styles = {
    card: {
        borderRadius: '12px',
        border: '1.5px solid',
        borderColor: 'aliceblue',
    },
    redAvatar: {
        backgroundColor: red[500],
    },
    greenAvatar: {
        backgroundColor: green[500],
    },
    blueAvatar: {
        backgroundColor: blue[500],
    },
    violetAvatar: {
        backgroundColor: '#7F00FF',
    },
    indigoAvatar: {
        backgroundColor: indigo[500],
    },
    orangeAvatar: {
        backgroundColor: orange[500],
    },
    yellowAvatar: {
        backgroundColor: yellow[500],
    },
};

class ProjectMedia extends Component {
    displayName = ProjectMedia.name

    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            imageIndex: 0,
            colorAvatar: [this.props.classes.redAvatar, this.props.classes.greenAvatar, this.props.classes.blueAvatar, this.props.classes.violetAvatar, this.props.classes.indigoAvatar, this.props.classes.orangeAvatar, this.props.classes.yellowAvatar][Math.floor(Math.random() * 7)],
        }
    }

    handleOnClick = (event) => {
        if (this.props.mediaList && this.props.mediaList.length > 0) {
            if (this.state.imageIndex === (this.props.mediaList.length - 1)) {
                // go back to the start of the array
                this.setState({ imageIndex: 0 });
            } else {
                this.setState({ imageIndex: this.state.imageIndex + 1 })
            }
        }
    }

    onMouseOver = () => this.setState({ isHovered: true });
    onMouseOut = () => this.setState({ isHovered: false });

    calcCardBorderColor = () => {
        if (this.state.colorAvatar !== undefined) {
            let sp = this.state.colorAvatar.split("-")[1];
            return sp.split('Avatar')[0];
        }
    }

    render() {
        const _borderColor = this.calcCardBorderColor();
        return (
            <Spring
                to={{
                    transform: `scale(${this.state.isHovered ? 1.1 : 1})`,
                    boxShadow: this.state.isHovered ? 'translate3d(0px, 2px, 0px) scale(1.07)' : 'translate3d(0px, 0px, 0px) scale(1)',
                    position: this.state.isHovered ? 'relative' : 'initial',
                    zIndex: this.state.isHovered ? 2 : 1,
                }}>
                {scale => (
                    <div style={scale} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                        <Card style={{ ...styles.card, borderColor: _borderColor }} raised={this.state.isHovered}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        className={this.state.colorAvatar}
                                        style={{ marginBottom: '5px' }}>
                                        {this.props.ownerName.charAt(0).toLocaleUpperCase()}
                                    </Avatar>
                                }
                                title={
                                    <Link
                                        variant="h6"
                                        component={RouterLink}
                                        to={{ pathname: '/story-line' }}>
                                        {this.props.projectTitle}>
                            </Link>
                                }
                                subheader={<Typography variant="body1" style={{ color: _borderColor }}>{this.props.ownerName}</Typography>}
                            />
                            <CardActionArea disabled={(this.props.mediaList.length < 2) ? true : false}>
                                <CardPrimaryContent>
                                    <CardMedia
                                        square
                                        onClick={this.handleOnClick}
                                        imageUrl={this.props.mediaList.length > 0 ? this.props.mediaList[this.state.imageIndex].url : ''}
                                    />
                                </CardPrimaryContent>
                            </CardActionArea>
                        </Card>
                    </div >)}
            </Spring>
        );
    }
}

export default (withStyles(styles)(ProjectMedia));