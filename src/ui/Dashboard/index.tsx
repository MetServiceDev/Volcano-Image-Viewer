import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setLogin } from '../../redux/effects/loginEffect';
import { User } from '../../api/User/headers';
import { SulfurMaps } from '../../metadata/SulfurMaps';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import LandingPage from '../LandingPage/LandingPage';
import { Volcano } from '../../api/volcano/headers';

interface Props {
    volcanoes: Volcano[]
}

const Dashboard: React.FC<Props> = ({ volcanoes }) => {
    const { oktaAuth , authState } = useOktaAuth();
    const dispatch = useDispatch();

    const logout = async (): Promise<void> => await oktaAuth.signOut({postLogoutRedirectUri: window.location.origin });

    React.useEffect(() => {
        if(authState && authState.isAuthenticated){ 
            const { email, aud, name } = authState?.idToken?.claims as any;
            const token = authState?.accessToken?.accessToken || '';
            dispatch(setLogin({ email, aud, name, token } as User));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authState]);


    if(!authState) {
        return <div>Loading...</div>
    }

    if(!authState.isAuthenticated){
        return <Redirect to='/login'/>
    };

    return(
        <div>
            <Navbar logout={logout}/>
            <Sidebar/>
            <LandingPage sulfurMaps={SulfurMaps} volcanoes={volcanoes}/>
        </div>
    )
};



export default Dashboard;