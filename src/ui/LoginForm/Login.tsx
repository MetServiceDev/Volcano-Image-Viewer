import React from 'react';
import { Paper, Button, LinearProgress, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { SigninWithRedirectOptions } from '@okta/okta-auth-js';

import icon from '../../images/volcano.png';
import { makeStyles, Theme } from '@material-ui/core/styles';

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
    const [username, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const [emailError, setEError] = React.useState(false);
    const emailRef = React.useRef<any>(null);

    const [passwordError, setPasswordError] = React.useState(false);
    const passRef = React.useRef<any>(null);

    const [errMsg, setErr] = React.useState(null);

    const { oktaAuth, authState } = useOktaAuth();

    if(authState && authState.isAuthenticated) { return <Redirect to='/'/> };

    const login = async () => {
        setLoading(true);
        if(username === ''){
            setEError(true);
            emailRef?.current?.focus();
            setLoading(false);
            return;
        }
        if(password === ''){
            setPasswordError(true);
            passRef?.current?.focus();
            setLoading(false);
            return;
        }

        try{
            setErr(null)
            const  { sessionToken } = await oktaAuth.signInWithCredentials({ username, password });
            await oktaAuth.signInWithRedirect({ sessionToken } as SigninWithRedirectOptions);
        } catch(err: any){
            setErr(err.toString());
            setLoading(false);
        };
    };

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.loginForm}>
                <img src={icon} alt='logo' width={64} className={classes.icon}/><br/>
                <TextField 
                    className={classes.input} 
                    label="Email" 
                    type='email'
                    style={{top:'30%'}}
                    error={emailError}
                    inputRef={emailRef}
                    onChange={(e) => {setEmail(e.target.value); setEError(false)}} 
                />
                <TextField 
                    className={classes.input}
                    label="Password" 
                    style={{top:'50%'}} 
                    type="password"
                    error={passwordError}
                    inputRef={passRef}
                    onChange={(e) => {setPassword(e.target.value); setPasswordError(false)}}
                />
                <Button className={classes.button} onClick={login}>Login</Button>
                {loading && <LinearProgress className={classes.loader} color="primary"/>}
            </Paper>
            {errMsg && <Alert className={classes.errorMsg} severity='error'> {errMsg}</Alert>}
        </div>
    );
};

export default Login;
