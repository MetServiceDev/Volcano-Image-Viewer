import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import authClient from '../../api/auth/Auth';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width:'100%',
        height:'100%',
        backgroundColor:theme.palette.background.default,
        position:'fixed',
        top:'0%',
        left:'0%'
    },
    loginForm: {
        width:'30%',
        position:'fixed',
        top:'10%',
        left:'35%',
        height: '65vh',
        borderRadius: '0px'
    },
    icon: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '30%',
        paddingTop:'5px'
    },
    input: {
        width: '90%',
        position:'absolute',
        left:'5%'
    },
    button: {
        width: '90%',
        position:'absolute',
        left:'5%',
        top:'70%',
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: 'rgba(255, 187, 0, 0.25)',
        borderRadius:'0px',
        height:'10vh',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }    
    },
    loader: {
        position:'absolute',
        bottom:'0%',
        width:'100%',
        backgroundColor: theme.palette.primary.dark,
    },
    errorMsg: {
        position: 'fixed',
        width:'30%',
        top:'80%',
        left:'35%'
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
            <Typography>
                Redirecting to Metservice, please wait...
            </Typography>
        </div>
    );
};

export default Login;
