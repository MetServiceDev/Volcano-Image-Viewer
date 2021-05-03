import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';

const styles = {
    root: {
        backgroundColor: '#f0f0f0'
    },
  }

const MapToggle = ({classes, showVAAC, showSO2}) => {
    return (
        <ButtonGroup className={classes.root}>
            <Button onClick={showVAAC}><DashboardIcon/></Button>
            <Button onClick={showSO2}>So2</Button>
        </ButtonGroup>
    );
};

export default withStyles(styles)(MapToggle);
