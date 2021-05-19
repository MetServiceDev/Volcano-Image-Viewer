import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import VolcanoCard from './VolcanoCard';
import SatelliteCard from './SatelliteCard';

const styles = {
    root: {
        display: 'grid',
        marginBottom: '20px'
    }
};

const VolcanoMatrix = ({classes, volcanoes}) => {

    const gridDisplay = useSelector(state => state.gridDisplay);
    const {showNZ, showVA, showCNI, showWI} = useSelector(state => state);

    const gridLayout = {
        gridTemplateColumns: `repeat(${gridDisplay}, 1fr)`,
    };

    const fontSize = gridDisplay === 6 ? '16px' : '24px';

    return (
        <div className={classes.root} style={gridLayout}>
            {volcanoes.map(volcano => {
                return(
                    <Fragment key={volcano.code}>
                        {volcano.location === 'Vanuatu' && showVA && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === 'NZ' && showNZ && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === 'Central NI' && showCNI && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                        {volcano.location === 'WI' && showWI && <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                    </Fragment>
                );
            })}
            <SatelliteCard fontSize={fontSize}/>
        </div>
    );
};

VolcanoMatrix.propTypes = {
    classes: PropTypes.object.isRequired,
    volcanoes: PropTypes.array.isRequired,
};

export default withStyles(styles)(VolcanoMatrix);
