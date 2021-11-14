import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Paper, Table, TableBody, TableRow, TableHead, TableContainer } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: 'auto',
        overflow: 'auto',
    },
})

interface Props extends WithStyles<typeof styles> {
    tableHeaders: JSX.Element[];
    tableContent: JSX.Element[];
    tableLabel: string;
}

const TableComponent: React.FC<Props> = ({ classes, tableHeaders, tableContent, tableLabel }) => {
    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table aria-label={tableLabel} stickyHeader>
                <TableHead>
                    <TableRow>
                        {tableHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableContent}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default withStyles(styles)(TableComponent);
