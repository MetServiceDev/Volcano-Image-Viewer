import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';

import VolcanoCard from './VolcanoCard';
import SatelliteCard from './SatelliteCard';
import { VolcanoLocation } from '@metservice/aviationtypes';
import { AppContext } from '../../AppContext';

const useStyles = makeStyles(() => ({
    root: {
        display: 'grid',
    }
}));

const VolcanoMatrix: React.FC = () => {
    const { volcanoes, gridDisplay, filters } = React.useContext(AppContext);
    const classes = useStyles();

    const gridLayout = {
        gridTemplateColumns: `repeat(${gridDisplay}, 1fr)`,
    };

    const fontSize = gridDisplay === 6 ? '16px' : '24px';

    return (
        <div className={classes.root} style={gridLayout}>
            {volcanoes.map((volcano) => {
                return(
                    <Fragment key={volcano.code}>
                        {volcano.location === VolcanoLocation.VANUATU && filters.showVA && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === VolcanoLocation.NZ && filters.showNZ && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === VolcanoLocation.CENTRAL_NI && filters.showCNI && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === VolcanoLocation.WI && filters.showWI && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                    </Fragment>
                );
            })}
            {filters.showSAT && <SatelliteCard fontSize={fontSize}/>}
        </div>
    );
};

export default VolcanoMatrix;
