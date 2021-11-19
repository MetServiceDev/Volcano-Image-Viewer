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
    datasets: Dataset[];
    labels: string[];
    height: number;
    volcanoName: string;
};

const LineGraph: React.FC<Props> = ({ datasets, labels, height, volcanoName }) => {
    const data = {
        labels:labels,
        datasets:datasets
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Earthquake History for ${volcanoName}`
            }
        },
        scales: {
            A: {
                display: true,
                id: 'A',
                position: 'left',
                title: {
                    display: true,
                    text: 'magnitude (ML)'
                },
                beginAtZero: true
            },
            B: {
                display: true,
                id: 'B',
                position: 'right',
                title: {
                    display: true,
                    text: 'depth (km)'
                },
                beginAtZero: true
            },
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
