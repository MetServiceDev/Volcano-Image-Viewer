import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';

const styles = (theme:any) => createStyles({
    originalData:{
        backgroundColor:theme.palette.primaryBg,
        padding:'20px',
        width:'30%'
    },
    dataInput:{
        width:'100%',
        marginTop:'10px',
        marginBottom:'10px'
    }
})

interface Dataset {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    fill: boolean
}

interface Props extends WithStyles<typeof styles> {
    data: any,
    height: number
};

const ScatterGraph: React.FC<Props> = ({ data, height }) => {
    return(
        <Scatter
            data={data}
            height={height}
        />
    )
};

export default withStyles(styles)(ScatterGraph);