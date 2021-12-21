import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { setLogin } from '../../redux/effects/loginEffect';
import { User } from '../../api/User/headers';
import authClient from '../../api/auth/Auth';
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
}

const Dashboard: React.FC<Props> = ({ volcanoes, hasLoaded, theme, toggleTheme }) => {
    const { oktaAuth , authState } = useOktaAuth();
    const dispatch = useDispatch();

    const logout = async (): Promise<void> => await oktaAuth.signOut({postLogoutRedirectUri: redirectUri });
    const quakeHistory = useSelector((state:AppState) => state.quakes);
    
    const [recentQuakes, setRecentQuakes] = React.useState<RecentQuake[]>([]);
    const [volcanoToOpen, setVolcano] = React.useState<string>('');
    const volcanoRef = React.useRef<HTMLAnchorElement>(null);

    React.useEffect(() => {
        if(authState && authState.isAuthenticated){ 
            const { email, aud, name } = authState?.idToken?.claims as any;
            const token = authState?.accessToken?.accessToken || '';
            dispatch(setLogin({ email, aud, name, token } as User));
            setRecentQuakes(findQuakes(quakeHistory));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authState]);

    const checkLogin = React.useCallback(
        async (): Promise<void> => {
            const activeSession = await authClient.session.exists();
            if (!activeSession) {
                await oktaAuth.signInWithRedirect({ originalUri: '/' });
            }
        },
        [oktaAuth]
    );

    React.useEffect(() => { checkLogin() }, [checkLogin, authState]);


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
    };

    const openVolcano = (volcanoName: string) => {
        if (volcanoName !== null) {
            setVolcano(volcanoName)
            setTimeout(() => {
                volcanoRef?.current?.click();
                setVolcano('')
            }, 100);
        }
    }

    return(
        <>
            <Link to={`/overview?volcano=${volcanoToOpen}`} ref={volcanoRef} hidden={true} target='_blank'/>
            <Navbar
                logout={logout}
                theme={theme}
                toggleTheme={toggleTheme}
                volcanoes={volcanoes}
                openVolcano={(e:any, val:string) => openVolcano(val)}
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
