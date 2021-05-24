import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import VolcanoCard from './VolcanoCard';
import SatelliteCard from './SatelliteCard';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const styles = {
    root: {
        display: 'grid',
        marginBottom: '20px'
    }
};

const VolcanoMatrix = ({classes, volcanoes}) => {

    const gridDisplay = useSelector(state => state.gridDisplay);
    const {showNZ, showVA, showCNI, showWI} = useSelector(state => state);

    const [volcanoesList, updateVolcanoesList] = useState(volcanoes);

    const gridLayout = {
        gridTemplateColumns: `repeat(${gridDisplay}, 1fr)`,
    };

    const fontSize = gridDisplay === 6 ? '16px' : '24px';

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(volcanoesList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateVolcanoesList(items);
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='volcanoes'>
                    {(provided) => ( <div className={classes.root} style={gridLayout} {...provided.droppableProps} ref={provided.innerRef}>
                        {volcanoesList.map((volcano, index) => {
                            return(
                                <Draggable key={volcano.code} draggableId={volcano.code} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {volcano.location === 'Vanuatu' && showVA &&
                                                <VolcanoCard  volcano={volcano}  fontSize={fontSize}/>}
                                            {volcano.location === 'NZ' && showNZ && 
                                                <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                                            {volcano.location === 'Central NI' && showCNI && 
                                                <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                                            {volcano.location === 'WI' && showWI && 
                                                <VolcanoCard volcano={volcano} fontSize={fontSize}/>}
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        <SatelliteCard fontSize={fontSize}/>
                    </div>)}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

VolcanoMatrix.propTypes = {
    classes: PropTypes.object.isRequired,
    volcanoes: PropTypes.array.isRequired,
};

export default withStyles(styles)(VolcanoMatrix);
