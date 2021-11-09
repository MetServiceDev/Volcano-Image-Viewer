import React from 'react';
import { Bar } from 'react-chartjs-2';

interface Dataset {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    fill: boolean
}

interface Props {
    datasets: Dataset[],
    labels: string[],
    height: number
};

const BarGraph: React.FC<Props> = ({ datasets, labels, height }) => {
    const data = {
        labels: labels,
        datasets: datasets
    }

    return (
        <Bar
            data={data}
            height={height}
        />
    )
};

export default BarGraph;
