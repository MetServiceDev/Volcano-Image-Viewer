import React from 'react';
import moment from 'moment';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Paper, Table, TableBody, TableCell, TableRow, TableHead, TableContainer } from '@material-ui/core';
import { QuakeFeature } from '@metservice/aviationtypes';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: '50vh',
        overflow: 'auto',
        marginLeft: theme.spacing(1)
    },
})

interface Props extends WithStyles<typeof styles> {
    quakes: QuakeFeature[];
}

const HistoryTable: React.FC<Props> = ({ classes, quakes }) => {
    const roundValue = (value: number) => Math.round(value * 100) / 100;

    const historyItem = (quake: QuakeFeature) => {
        const { properties } = quake;
        return (
            <TableRow key={properties.publicID}>
              <TableCell component="th" scope="row">
                {properties.intensity}
              </TableCell>
              <TableCell align="left">{roundValue(properties.magnitude)}</TableCell>
              <TableCell align="left">{roundValue(properties.depth)}</TableCell>
              <TableCell align="left">{properties.locality}</TableCell>
              <TableCell align="left">{moment(properties.time).format('H:mm DD/MM')}</TableCell>
            </TableRow>
        );
    };

    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table aria-label="quake-history" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Intensity</TableCell>
                        <TableCell align="left">Magnitude (ML)</TableCell>
                        <TableCell align="left">Depth (km)</TableCell>
                        <TableCell align="left">Locality</TableCell>
                        <TableCell align="left">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {quakes.map(quake => historyItem(quake))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default withStyles(styles)(HistoryTable);
