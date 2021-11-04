import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Tooltip, Typography } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';

const styles = () => createStyles({
    noWarning : {
        color: '#03fc77'
    },
    mediumWarning: {
        color: '#fcbe03'
    },
    severeWarning: {
        color: '#ff2e2e'
    },
});

interface Props extends WithStyles<typeof styles> {
    fontSize: string;
    data: {
        level: string,
        msg: string
    };
}

const AlertIcon: React.FC<Props> = ({ classes, data, fontSize }) => { 
    const getIcon = (): JSX.Element => {
        switch(data.level){
            case '0':
            case '1':
                return <ReportProblemOutlinedIcon className={classes.noWarning} style={{fontSize}}/>;
            case '2':
            case '3':
                return <ReportProblemOutlinedIcon className={classes.mediumWarning} style={{fontSize}}/>;
            case '4':
            case '5':
                return <ErrorOutlineOutlinedIcon className={classes.severeWarning} style={{fontSize}}/>;
            default:
                return <ReportProblemOutlinedIcon className={classes.noWarning} style={{fontSize}}/>;
        };
    };

    const msg = (
        <>
            <Typography>
                Alert level {data.level}
            </Typography>
            <Typography style={{ fontWeight:'bold' }}>
                {data.msg}
            </Typography>
        </>
    )

    return (
        // <div onMouseEnter={showAlert} onMouseLeave={hideAlert} onClick={toggle}>
        //     {getIcon()}
        // </div>
        <Tooltip title={msg} arrow>
            {getIcon()}
        </Tooltip>
    );
};

export default withStyles(styles)(AlertIcon);
