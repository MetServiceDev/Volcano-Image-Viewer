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

    const options = {
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
            ticks: {
                beginAtZero: true,
                min: 0
            }
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
                beginAtZero: true,
                min: 0
            }
          }]
        }
    } as any;

    return(
        <Line
            data={data}
            height={height}
            options={options}
        />
    )
};

export default withStyles(styles)(LineGraph);