import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, LinearProgress } from '@material-ui/core';

import authClient from '../../api/auth/Auth';
import appLogo from '../../images/volcano.png';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width:'100%',
        height:'100%',
        backgroundColor:theme.palette.background.default,
        position:'fixed',
        top:'0%',
        left:'0%'
    },
    wrapper: {
        textAlign: 'center',
        position: 'absolute',
        left: '35%',
        top: '5%'
    },
    img: {
        width: '65%',
        marginTop: theme.spacing(2)
    }
}));

const Login: React.FC = () => {
    const classes = useStyles();

    const { oktaAuth, authState } = useOktaAuth();

    const checkLogin = React.useCallback(
        async (): Promise<void> => {
            const activeSession = await authClient.session.exists();
            if (!activeSession) {
                await oktaAuth.signInWithRedirect({ originalUri: '/' });
            }
        },
        [oktaAuth]
    );

    React.useEffect(() => { checkLogin() }, [checkLogin]);

    if(authState && authState.isAuthenticated) {
        return <Redirect to='/'/>
    };


    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Typography variant="h6">
                    Redirecting to Metservice, please wait...
                </Typography>
                <LinearProgress color='primary' />
                <img src={appLogo} alt="logo" className={classes.img} />
            </div>
        </div>
    );
};

export default Login;
