import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Tooltip, Theme, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch } from 'react-redux';

import { setLogin } from '../../redux/effects/loginEffect';
import { User } from '../../api/User/headers';
import { poll } from '../../api/poller';
import authClient from '../../api/auth/Auth';
import { useEmissionsEffect } from '../../api/volcano/fetchGasEmissions';
import apiCall from '../../api/APICall';

import VolcanicAlert from './VolcanicAlert';

import { Volcano, OverviewDisplay, VolcanoLocation, Note } from '../../api/volcano/headers';
import Sidebar from './Sidebar';

import LiveImages from './live-images';
import GNSCharts from './GNS-Charts';
import QuakePanel from './quake-panel';
import GasEmission from './gas-emission';

const styles = (theme:Theme) => createStyles({
    root: {
    },
    navbar: {
        position: 'fixed',
        backgroundColor:theme.palette.background.default,
        borderBottom: '1px solid #404040',
        textAlign:'center',
        width:'100%',
        overflow:'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(1),
        paddingLeft: '0px',
        zIndex: 4,
    },
    homeIcon: {
        marginRight: theme.spacing(1),
        float:'left'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        opacity:'0.7',
        transition: '0.5s',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            opacity:'1',
        }
    },
    mainPanel: {
        width: '95%',
        margin: 'auto',
        position: 'absolute',
        paddingLeft: theme.spacing(2),
        top: '10%',
        left: theme.spacing(5),
    }
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

interface Props extends WithStyles<typeof styles> {}

const VolcanoOverview: React.FC<Props> = ({ classes }) => {
    const { authState } = useOktaAuth();
    const dispatch = useDispatch();

    let query = useQuery();
    const volcano = query.get('volcano');
    const [volcanoes, setVolcanoes] = React.useState<Volcano[]>([]);

    const volcanoObject = volcanoes.find(v => v.name === volcano) as Volcano || {};
    const [gasEmissions] = useEmissionsEffect(volcanoObject?.FIT_ID as string);
    const { name, volcanicAlerts } = volcanoObject;

    const [notes, setNotes] = React.useState<Note[]>([]);

    React.useEffect(() => {
        if(authState && authState.isAuthenticated){ 
            const { email, aud, name } = authState?.idToken?.claims as any;
            const token = authState?.accessToken?.accessToken || '';
            dispatch(setLogin({ email, aud, name, token } as User));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authState]);

    const [currentDisplay, setCurrentDisplay] = React.useState<OverviewDisplay>(OverviewDisplay.THUMBNAIL);
    const domesticVolcano = volcanoObject.location !== VolcanoLocation.VANUATU && volcanoObject.code !== 'ERB';

    const getSession = async(): Promise<boolean> => {
        const activeSession = await authClient.session.exists();
        return activeSession;
    };

    const poller = React.useCallback(
        async(): Promise<void> => {
            const activeSession = await getSession();
            if (activeSession) {
                const token = authClient.getAccessToken() as string;
                const volcanoes = await poll(token)
                setVolcanoes(volcanoes);
            };
        },
        []
    );

    const fetchEmission = React.useCallback(
        async (): Promise<void> => {
            const activeSession = await getSession();
            if (activeSession) {
                const token = authClient.getAccessToken() as string;
                const notes = await apiCall<Note[]>(`volcanoes/notes?volcanoId=${volcanoObject.code}`, 'GET', token);
                setNotes(notes);
            };
        },
        [volcanoObject.code]
    );

    React.useEffect(() => { poller() }, [poller]);
    React.useEffect(() => { fetchEmission() }, [fetchEmission]);

    return (
        <div className={classes.root}>
            <Sidebar
                openLiveView={() => setCurrentDisplay(OverviewDisplay.THUMBNAIL)}
                openGraphs={() => setCurrentDisplay(OverviewDisplay.DRUM_GRAPH)}
                openQuakes={() => setCurrentDisplay(OverviewDisplay.QUAKES)}
                openEmissions={() => setCurrentDisplay(OverviewDisplay.GAS_EMISSION)}
                currentDisplay={currentDisplay}
                volcano={volcanoObject}
            />
            <div className={classes.navbar}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Link className={classes.link} to='/'>
                        <Tooltip title="Return to overview" arrow>
                            <IconButton className={classes.homeIcon} aria-label="return home">
                                <HomeIcon/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Typography variant='h6'>{name}</Typography>
                </div>
                {volcanicAlerts && <VolcanicAlert data={volcanicAlerts}/>}
            </div>
            <div className={classes.mainPanel}>
                {(() => {
                    switch (currentDisplay) {
                        case OverviewDisplay.THUMBNAIL:
                            return <LiveImages
                                        notes={notes}
                                        volcano={volcanoObject}
                                        volcanoes={volcanoes}
                                    />
                        case OverviewDisplay.DRUM_GRAPH:
                            return <GNSCharts
                                        domesticVolcano={domesticVolcano}
                                        src={volcanoObject.drumLink as string}
                                    />
                        case OverviewDisplay.QUAKES:
                            return <QuakePanel
                                        volcano={volcanoObject}
                                    />
                        case OverviewDisplay.GAS_EMISSION:
                            return <GasEmission
                                        FIT_ID={volcanoObject?.FIT_ID as string}
                                        emissionData={gasEmissions}
                                    />
                    }
                })()}
            </div>
        </div>
    );
};

export default withStyles(styles)(VolcanoOverview);