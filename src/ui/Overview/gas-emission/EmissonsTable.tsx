import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import moment from 'moment';

import TableComponent from "../../ReusedComponents/table";
import { EmissionMeasures } from '../../../api/volcano/headers';
import { TableCell, TableRow, Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    tableRow: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.paper,
        }
    },
});

interface Props extends WithStyles<typeof styles> {
    element: string;
    emissionData: EmissionMeasures
}

interface Data {
    time: string;
	measurement: number;
	error: Number;
}

const EmissionTable: React.FC<Props> = ({ classes, element, emissionData }) => {

    const emssionItem = (data: Data) => {
        return (
            <TableRow key={data.time} className={classes.tableRow}>
              <TableCell component="th" scope="row">
                {moment(data.time).format('MMM DD')}
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
            tableContent={emissionData.data.map(item => emssionItem(item))}
        />
    )
};

export default withStyles(styles)(EmissionTable);