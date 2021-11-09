import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Paper } from '@material-ui/core';
import moment from 'moment';

import GraphComponent from '../Graphs';
import { GraphType, LineData } from '../../api/graph/headers';
import { Quake, quakeMarker, VolcanoLevels } from '../../api/quakes/headers';
import { Volcano } from '../../api/volcano/headers';
import { gnsRestEndpoint } from '../../metadata/Endpoints';
import HistoryTable from './HistoryTable';

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
    VolcanoLevels.UNNOTICABLE,
    VolcanoLevels.WEAK,
    VolcanoLevels.LIGHT,
    VolcanoLevels.MODERATE,
    VolcanoLevels.STRONG,
    VolcanoLevels.SEVERE,
    VolcanoLevels.EXTREME
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
    const [quakes, setQuakes] = React.useState<Quake[]>([]);

    const fetchData = async(): Promise<Quake[]> => {
        const call = await fetch(`${gnsRestEndpoint}/volcano/quake/${volcano?.gnsID}`);
        const data = await call.json();
        return data.features.reverse();
    };

    const groupBy = () => {
        return quakes.reduce(function(memo: any, x: any) {
          if (!memo[x['properties']['intensity']]) { memo[x['properties']['intensity']] = []; }
          memo[x['properties']['intensity']].push(x);
          return memo;
        }, {});
    };

    const quakeFrequency = Object.entries(groupBy()).map((obj: any) => {
        return obj[1].length
    });

    React.useEffect(() => {
        if (volcano.gnsID) {
            fetchData().then(res => setQuakes(res));
        }
    }, []);

    const magnitudeLevels: LineData<number[]> = {
        label: 'Earthquake magnitude',
        data: quakes.map(quake => quake.properties.magnitude),
        backgroundColor: 'rgba(255, 187, 0, 0.5)',
        borderColor: '#ffbb00',
        pointRadius: 8,
        yAxisID: 'A',
    };

    const depthLevel: LineData<number[]> = {
        label: 'Depth (km)',
        data: quakes.map(quake => quake.properties.depth),
        backgroundColor: 'rgba(10, 13, 79, 0.25)',
        borderColor: '#0a0d4f',
        fill: true,
        pointRadius: 0,
        borderWidth: 1,
        yAxisID: 'B',
    };

    const barDataset = [
        {
            label: 'Earthquake frequency',
            data: quakeFrequency,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2
        },
    ]
    
    const barGraph = (
        <Paper elevation={3} className={classes.barGraphWrapper}>
            <GraphComponent
                graphType={GraphType.BAR}
                labels={barlabels}
                data={barDataset}
                height={140}
            />
        </Paper>
    )

    const overviewGraph = (
        <GraphComponent
            graphType={GraphType.LINE}
            data={[magnitudeLevels, depthLevel]}
            height={80}
            labels={quakes.map(quake => moment(quake.properties.time).format('llll'))}
        />
    )

    return (
        <>
            {overviewGraph}
            <div className={classes.bottomWrapper}>
                {barGraph}
                <HistoryTable quakes={quakes}/>
            </div>
        </>
    )
};

export default withStyles(styles)(QuakePanel);