import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import VolcanoCard from './VolcanoCard';
import SatelliteCard from './SatelliteCard';
import { AppState } from '../../redux/store';
import { VolcanoLocation } from '../../api/volcano/headers';
import VolcanoContext from './VolcanoContext';

const useStyles = makeStyles(() => ({
    root: {
        display: 'grid',
    },
}));

const VolcanoMatrix: React.FC = () => {
    const volcanoes = React.useContext(VolcanoContext);
    const classes = useStyles();
    const gridDisplay = useSelector((state: AppState) => state.gridDisplay);
    const { showNZ, showVA, showCNI, showWI, showSAT } = useSelector((state: AppState) => state.filters);

    const gridLayout = {
        gridTemplateColumns: `repeat(${gridDisplay}, 1fr)`,
    };

    const fontSize = gridDisplay === 6 ? '16px' : '24px';

    return (
        <div className={classes.root} style={gridLayout}>
            {volcanoes.map(volcano => {
                return(
                    <Fragment key={volcano.code}>
                        {volcano.location === VolcanoLocation.VANUATU && showVA && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === VolcanoLocation.NZ && showNZ && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === VolcanoLocation.CENTRAL_NI && showCNI && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === VolcanoLocation.WI && showWI && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                    </Fragment>
                );
            })}
            {showSAT && <SatelliteCard fontSize={fontSize}/>}
        </div>
    );
};

export default VolcanoMatrix;
