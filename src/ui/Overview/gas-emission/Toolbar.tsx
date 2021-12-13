import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Slider , MenuItem, Select } from '@material-ui/core';
import { PlotType } from '../../../api/volcano/headers';

const styles = () => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});

interface Props extends WithStyles<typeof styles> {
    setDayLength: (e: any, val: any) => void;
    setPlotType: (e: any) => void;
    plotType: PlotType;
    defaultVal?: number
};

const Toolbar: React.FC<Props> = ({ classes, setDayLength, setPlotType, plotType, defaultVal }) => {
    return (
        <div className={classes.root}>
            <Slider
                aria-label="Day Length"
                defaultValue={defaultVal || 18}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={36}
                style={{ width: '75%', transform: 'translate(0, 50%)' }}
                onChange={setDayLength}
            />
            <Select
                value={plotType}
                style={{ width: '20%' }}
                onChange={setPlotType}
                variant='outlined'
            >
                {Object.entries(PlotType).map(([key, value]) => 
                    <MenuItem
                        key={key} 
                        value={value}
                    >
                        {value}
                    </MenuItem>
                )}
            </Select>
        </div>
    );
};

export default withStyles(styles)(Toolbar);
