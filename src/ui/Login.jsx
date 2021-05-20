import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import icon from '../images/volcano.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import authClient from '../modules/Auth';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { useOktaAuth } from '@okta/okta-react';
import { redirectUri } from '../metadata/Endpoints';

const styles = {
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
            borderBottomColor: '#ffbb00',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#ffbb00',
            },
        }   
    },
    button: {
        width: '90%',
        position:'absolute',
        left:'5%',
        top:'70%',
        border: '1px solid #ffbb00',
        backgroundColor: 'rgba(255, 187, 0, 0.25)',
        borderRadius:'0px',
        height:'10vh',
        '&:hover': {
            backgroundColor: 'rgba(255, 187, 0, 0.5)'
        }    
    },
    loader: {
        position:'absolute',
        bottom:'0%',
        width:'100%',
        backgroundColor:'rgba(255, 187, 0, 0.5)',
    },
    errorMsg: {
        position: 'fixed',
        width:'30%',
        top:'80%',
        left:'35%'
    }
};

const theme = createMuiTheme({
    palette: {
       secondary: {
           main: '#ffbb00'
       }
    }
});

const Login = ({classes}) => {

    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [emailError, setEError] = useState(false)
    const emailRef = useRef()

    const [passwordError, setPasswordError] = useState(false)
    const passRef = useRef();

    const loggedIn = useSelector(state => state.loggedIn);

    const [error, setError] = useState({msg:'', show:false});

    const { oktaAuth } = useOktaAuth();

    const login = () => {
        setLoading(true)
        if(username === ''){
            setEError(true)
            emailRef.current.focus()
            emailRef.current.placeholder = 'Username Required';
            setLoading(false)
            return
        }
        if(password === ''){
            setPasswordError(true)
            passRef.current.focus()
            passRef.current.placeholder = 'Invalid Password';
            setLoading(false)
            return
        }

        oktaAuth.signInWithCredentials({ username, password }).then(async(res) => {
            if (res.status === 'SUCCESS') {
                const successResult = await authClient.token.getWithoutPrompt({
                    responseType: ['id_token', 'token'],
                    sessionToken: res.sessionToken,
                    redirectUri: redirectUri,
                });
                const accessToken = successResult.tokens.accessToken.accessToken;
                authClient.tokenManager.setTokens(successResult)
                localStorage.setItem('token', accessToken);      
            }
            window.location.reload();
        }).catch(e => {
            setLoading(false)
            setError({msg: e.toString(), show:true})
        })
    };

    if(loggedIn){ return <Redirect to='/'/> }

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
                {loading && <MuiThemeProvider theme={theme}><LinearProgress className={classes.loader} color="secondary"/></MuiThemeProvider>}
            </Paper>
            {error.show && <Alert className={classes.errorMsg} icon={alert.icon} severity='error'> {error.msg}</Alert>}
        </div>
    );
};

Login.propTypes = {
    classes:PropTypes.object
};

export default withStyles(styles)(Login);
