import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect, Link } from 'react-router-dom';
import { Volcano, RecentQuake } from '@metservice/aviationtypes';

import { SulfurMaps } from '../../metadata/SulfurMaps';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import LandingPage from '../LandingPage/LandingPage';
import { redirectUri } from '../../metadata/Endpoints';
import findQuakes from '../../api/quakes/findRecentQuakes';
import EruptionPopup from './EruptionPopup';
import { AppContext } from '../../AppContext';

interface Props {
    theme: boolean,
    toggleTheme: () => void,
}

const Dashboard: React.FC<Props> = ({ theme, toggleTheme }) => {
    const { oktaAuth , authState } = useOktaAuth();

    const { volcanoes, quakes, user } = React.useContext(AppContext);

    const logout = async (): Promise<void> => await oktaAuth.signOut({postLogoutRedirectUri: redirectUri });
    
    const [recentQuakes, setRecentQuakes] = React.useState<RecentQuake[]>([]);
    const [volcanoToOpen, setVolcano] = React.useState<string>('');
    const volcanoRef = React.useRef<HTMLAnchorElement>(null);

    React.useEffect(() => {
        if (user) {
            setRecentQuakes(findQuakes(quakes));
        };
    },[user, quakes]);


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
            <LandingPage sulfurMaps={SulfurMaps} />
            {returnSnackbar()}
        </>
    )
};



export default Dashboard;
