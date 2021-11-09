import React from 'react';
import { Line } from 'react-chartjs-2';
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
    datasets: Dataset[],
    labels: string[],
    height: number
};

const LineGraph: React.FC<Props> = ({ datasets, labels, height }) => {
    const data = {
        labels:labels,
        datasets:datasets
    };

    return(
        <Line
            data={data}
            height={height}
        />
    )
};

export default withStyles(styles)(LineGraph);