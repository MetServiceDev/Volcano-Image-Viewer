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
        backgroundColor:'white',
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
        left:'5%',
        '& label.Mui-focused': {
            color: '#404040',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.primary.main,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
        }   
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
    // const setLogin = bool => dispatch(handleLogin(bool));

    // const setToken = token => dispatch(handleToken(token));

    const [errMsg, setErr] = React.useState(null);

    const { oktaAuth, authState } = useOktaAuth();

    if(authState && authState.isAuthenticated) { return <Redirect to='/'/> };

    // const login = async() => {
    //     if(username === ''){
    //         setEERR(true);
    //         setErr('Email Required'); 
    //         return;
    //     }
    //     if(password === ''){
    //         setPasswordError(true);
    //         passRef.current.focus();
    //         passRef.current.placeholder = 'Invalid Password';
    //         return;
    //     }
    //     setLoading(true);
    //     try{
    //         setErr(null)
    //         const  { sessionToken } = await oktaAuth.signInWithCredentials({ username, password });
    //         await oktaAuth.signInWithRedirect({ sessionToken });
    //     } catch(err){
    //         setErr(err.toString());
    //         setLoading(false);
    //     };
    // };

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

        // oktaAuth.signInWithCredentials({ username, password }).then(async(res) => {
        //     if (res.status === 'SUCCESS') {
        //         const successResult = await authClient.token.getWithoutPrompt({
        //             responseType: ['id_token', 'token'],
        //             sessionToken: res.sessionToken,
        //             redirectUri: redirectUri,
        //         });
        //         const accessToken = successResult.tokens.accessToken.accessToken;
        //         authClient.tokenManager.setTokens(successResult);
        //         localStorage.setItem('token', accessToken);
        //         setToken(accessToken);
        //         setLogin(true);
        //     }
        // }).catch(e => {
        //     setLoading(false);
        //     setError({msg: e.toString(), show:true});
        // });
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
