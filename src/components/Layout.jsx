import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavMenu from './NavMenu';

//xs - extra small. xs = {12} => one item in small screen
//sm - medium. sm = {6} => two items in medium screen
//lg - large. lg = {4} => four items in medium screen
function Layout(props) {
    return (
        <Grid container>
            <Grid item xs={12} style={{ paddingBottom: 24 }}>
                <NavMenu />
            </Grid>
            <Grid item xs={12} >
                {props.children}
            </Grid>
        </Grid>
    );
}

export default Layout;
