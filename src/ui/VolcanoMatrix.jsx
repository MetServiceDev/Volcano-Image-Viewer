import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import VolcanoCard from './VolcanoCard';

const styles = {
    root: {
        display: 'grid',
    }
};

const VolcanoMatrix = ({classes, volcanoes}) => {

    const gridDisplay = useSelector(state => state.gridDisplay);
    const showNZ = useSelector(state => state.showNZ);
    const showVA = useSelector(state => state.showVA);
    const showCNI = useSelector(state => state.showCNI);
    const showWI = useSelector(state => state.showWI);

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
            </div>
    );
};

VolcanoMatrix.propTypes = {
    classes: PropTypes.object.isRequired,
    volcanoes: PropTypes.array.isRequired,
};

export default withStyles(styles)(VolcanoMatrix);
