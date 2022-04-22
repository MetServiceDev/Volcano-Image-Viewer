import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import moment from 'moment';
import { TableCell, TableRow, Theme } from '@material-ui/core';
import { Observation } from '@metservice/aviationtypes';

import TableComponent from "../../ReusedComponents/table";

const styles = (theme: Theme) => createStyles({
    tableRow: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.paper,
        }
    },
});

interface Props extends WithStyles<typeof styles> {
    element: string;
    emissionMeasures: Observation[];
}

// interface Data {
//     time: string;
// 	measurement: number;
// 	error: Number;
// }

const EmissionTable: React.FC<Props> = ({ classes, element, emissionMeasures }) => {

    const emssionItem = (data: Observation) => {
        return (
            <TableRow key={data.time} className={classes.tableRow}>
              <TableCell component="th" scope="row" title={moment(data.time).format('Do MMMM YYYY')}>
                {moment(data.time).format('Do MMM YY')}
              </TableCell>
              <TableCell align="left">{data.measurement}</TableCell>
              <TableCell align="left">{data.error}</TableCell>
            </TableRow>
        )
    }

    return (
        <TableComponent
            tableLabel={`${element}-emssion-table`}
            tableHeaders={['Date', `${element} in air (kg/s)`, 'Error (kg/s)'].map((header) => {
                return <TableCell align="left">{header}</TableCell>
            })}
            tableContent={emissionMeasures.map((item) => emssionItem(item))}
        />
    )
};

export default withStyles(styles)(EmissionTable);
