import React from 'react';
import LineGraph from './Line';
import BarGraph from './Bar';
import { GraphType } from '../../api/graph/headers';
import ScatterGraph from './Scatter';

interface Props {
    graphType: GraphType,
    data: any,
    labels?: string[],
    height?: number
}

const GraphComponent: React.FC<Props> = ({ graphType, data, labels, height }) => {

    const renderGraph = () => {
        switch(graphType){
            case GraphType.LINE:
                return <LineGraph datasets={data} labels={labels as string[]} height={height as number}/>
            case GraphType.SCATTER:
                return <ScatterGraph data={data} height={height as number}/>
            case GraphType.BAR:
                return <BarGraph datasets={data} labels={labels as string[]} height={height as number}/>
        };
    };

    return (
        <div style={{ width: '100%'}}>
            {renderGraph()}
        </div>
    )
};

export default GraphComponent;
