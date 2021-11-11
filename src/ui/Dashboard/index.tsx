import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setLogin } from '../../redux/effects/loginEffect';
import { User } from '../../api/User/headers';
import { SulfurMaps } from '../../metadata/SulfurMaps';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import LandingPage from '../LandingPage/LandingPage';
import { Volcano } from '../../api/volcano/headers';
import { RecentQuake } from '../../api/quakes/headers';
import { redirectUri } from '../../metadata/Endpoints';
import { AppState } from '../../redux/store';
import findQuakes from '../../api/quakes/findRecentQuakes';
import EruptionPopup from './EruptionPopup';

interface Props {
    volcanoes: Volcano[],
    hasLoaded: boolean,
    theme: boolean,
    toggleTheme: () => void,
    search: (e:any) => any
}

const Dashboard: React.FC<Props> = ({ volcanoes, hasLoaded, theme, toggleTheme, search }) => {
    const { oktaAuth , authState } = useOktaAuth();
    const dispatch = useDispatch();

    const logout = async (): Promise<void> => await oktaAuth.signOut({postLogoutRedirectUri: redirectUri });
    const quakeHistory = useSelector((state:AppState) => state.quakes);
    
    const [recentQuakes, setRecentQuakes] = React.useState<RecentQuake[]>([]);

    React.useEffect(() => {
        if(authState && authState.isAuthenticated){ 
            const { email, aud, name } = authState?.idToken?.claims as any;
            const token = authState?.accessToken?.accessToken || '';
            dispatch(setLogin({ email, aud, name, token } as User));
            setRecentQuakes(findQuakes(quakeHistory));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authState]);


    if(!authState) {
        return <div>Loading...</div>
    }

    if(!authState.isAuthenticated){
        return <Redirect to='/login'/>
    };

    const returnSnackbar = () => {
        return recentQuakes.map(quake => {
            const volcano = volcanoes.find(v => v.gnsID === quake.volcanoID) as Volcano;
            return <EruptionPopup volcano={volcano} intensity={quake.intensity} key={volcano.code}/>
        })
    }

    return(
        <>
            <Navbar
                logout={logout}
                theme={theme}
                toggleTheme={toggleTheme}
                search={search}
                volcanoes={volcanoes}
            />
            <Sidebar/>
            <LandingPage
                sulfurMaps={SulfurMaps}
                volcanoes={volcanoes}
                hasLoaded={hasLoaded}
            />
            {returnSnackbar()}
        </>
    )
};



export default Dashboard;