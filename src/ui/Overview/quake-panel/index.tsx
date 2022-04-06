import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Paper } from '@material-ui/core';
import moment from 'moment';
import { QuakeFeature, QuakeIntesity, QuakeDict, Volcano } from '@metservice/aviationtypes';

import GraphComponent from '../../Graphs';
import { GraphType, LineData } from '../../../api/graph/headers';
import { quakeMarker } from '../../../api/quakes/headers';
import { gnsRestEndpoint } from '../../../metadata/Endpoints';
import HistoryTable from './HistoryTable';
import colorPalette from '../../../ColorPalette';

const styles = (theme: Theme) => createStyles({
    root: {
        height: '100vh',
        position: 'fixed',
        backgroundColor: theme.palette.background.default,
        width: theme.spacing(5)
    },
    icon: {
        borderRadius: '0%',
        width: '100%',
        marginBottom: theme.spacing(4),
        '&:hover': {
            color: theme.palette.primary.dark
        },
    },
    innerWrapper: {
        marginTop: theme.spacing(8)
    },
    bottomWrapper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        justifyContent: 'space-between'
    },
    barGraphWrapper: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing(1),
        paddingBottom: '0px',
        height: '50vh',
        marginRight: theme.spacing(1)
    }
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano
};

const barlabels = [
    QuakeIntesity.UNNOTICABLE,
    QuakeIntesity.WEAK,
    QuakeIntesity.LIGHT,
    QuakeIntesity.MODERATE,
    QuakeIntesity.STRONG,
    QuakeIntesity.SEVERE,
    QuakeIntesity.EXTREME
]

const backgroundColors = [
    quakeMarker.unnoticable.bg,
    quakeMarker.weak.bg,
    quakeMarker.light.bg,
    quakeMarker.moderate.bg,
    quakeMarker.strong.bg,
    quakeMarker.severe.bg,
    quakeMarker.extreme.bg,
];

const borderColors = [
    quakeMarker.unnoticable.primary,
    quakeMarker.weak.primary,
    quakeMarker.light.primary,
    quakeMarker.moderate.primary,
    quakeMarker.strong.primary,
    quakeMarker.severe.primary,
    quakeMarker.extreme.primary,
]

const QuakePanel: React.FC<Props> = ({ classes, volcano }) => {
    const [quakes, setQuakes] = React.useState<QuakeFeature[]>([]);

    const allLevels = [
        QuakeIntesity.UNNOTICABLE, QuakeIntesity.WEAK, QuakeIntesity.LIGHT, QuakeIntesity.MODERATE,
        QuakeIntesity.STRONG, QuakeIntesity.SEVERE, QuakeIntesity.EXTREME
    ];

    const fetchData = async(): Promise<QuakeFeature[]> => {
        const call = await fetch(`${gnsRestEndpoint}/volcano/quake/${volcano?.gnsID}`);
        const data = await call.json();
        return data.features.reverse();
    };

    const groupBy = (): QuakeDict => {
        return quakes.reduce((memo: any, x: any) => {
          if (!memo[x['properties']['intensity']]) { memo[x['properties']['intensity']] = []; }
          memo[x['properties']['intensity']].push(x);
          return memo;
        }, {}) as QuakeDict;
    };
    const quakeFrequency = Object.entries(groupBy()).map((obj) => {
        return {
            level: obj[0],
            frequency: obj[1]?.length
        } 
    });

    React.useEffect(() => {
        if (volcano.gnsID) {
            fetchData().then(res => setQuakes(res));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const magnitudeLevels: LineData<number[]> = {
        label: 'Magnitude (ML)',
        data: quakes.map(quake => quake.properties.magnitude),
        backgroundColor: colorPalette.dark,
        borderColor: colorPalette.main,
        pointRadius: 8,
        yAxisID: 'A',
    };

    const depthLevel: LineData<number[]> = {
        label: 'Depth (km)',
        data: quakes.map(quake => quake.properties.depth),
        backgroundColor: 'rgba(10, 13, 79, 0.25)',
        borderColor: '#0a0d4f',
        fill: true,
        pointRadius: 3,
        borderWidth: 1,
        yAxisID: 'B',
    };

    const barDataset = [
        {
            label: `Earthquake frequency since ${moment(quakes[0]?.properties.time).format('ll')}`,
            data: allLevels.map(eachLevel => {
                const quakeLevel = quakeFrequency.find(q => q.level === eachLevel.toLowerCase())
                if (quakeLevel) {
                    return quakeLevel.frequency
                }
                return 0
            }),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2
        },
    ];
    
    const barGraph = (
        <Paper elevation={3} className={classes.barGraphWrapper}>
            <GraphComponent
                graphType={GraphType.BAR}
                labels={barlabels}
                data={barDataset}
                height={140}
            />
        </Paper>
    );

    const overviewGraph = (
        <GraphComponent
            graphType={GraphType.LINE}
            data={[magnitudeLevels, depthLevel]}
            height={80}
            volcanoName={volcano.name}
            labels={quakes.map(quake => moment(quake.properties.time).format('llll'))}
        />
    );

    return (
        <>
            {overviewGraph}
            <div className={classes.bottomWrapper}>
                {barGraph}
                <HistoryTable quakes={quakes}/>
            </div>
        </>
    );
};

export default withStyles(styles)(QuakePanel);
