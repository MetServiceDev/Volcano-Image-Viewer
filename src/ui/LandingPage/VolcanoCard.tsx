import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { Paper, Typography, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';

import AlertIcon from '../ReusedComponents/AlertIcon';
import VolcanoThumbnails from '../ReusedComponents/VolcanoThumbnails';
import { Volcano } from '../../api/volcano/headers';
import { AppState } from '../../redux/store';
import formatS3Tags from '../../api/images/formatS3Tags';

const styles = (theme: Theme) => createStyles({
    div: {
        margin:theme.spacing(1),
        position:'relative',
        '&:hover': {
            boxShadow:'4px 4px 8px #404040'
        },
        backgroundColor: theme.palette.background.default
    },
    link: {
        textDecoration:'none'
    },
    header: {
        borderBottom: '1px solid #404040',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nameText: {
        padding: theme.spacing(0.5),
        
    },
    icon: {
        marginRight: theme.spacing(1), 
        marginLeft: theme.spacing(1),
    },
    icons: {
        marginRight: theme.spacing(1),
    }
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano;
    fontSize: string;
};

const VolcanoCard: React.FC<Props> = ({ classes, volcano, fontSize }) => {
    const alert = volcano.volcanicAlerts;

    const allS3Tags = useSelector((state:AppState) => state.s3ImageTags);
    const [s3Tags, setTags] = React.useState<string[]>([]);

    React.useEffect(() => {
        setTags(formatS3Tags(allS3Tags, volcano.code));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allS3Tags]);

    return (
        <Link className={classes.link} to={`overview?volcano=${volcano.name}`} target='_blank' key={volcano.code}>
            <Paper className={classes.div} elevation={3}>
                <div className={classes.header}>
                    <Typography variant='h4' className={classes.nameText} style={{ fontSize }}>
                        {volcano.name}
                    </Typography>
                    <span className={classes.icons}>{alert && 
                        <AlertIcon data={alert} fontSize={fontSize}/>}
                    </span>
                </div>
                <VolcanoThumbnails
                    volcano={volcano}
                    s3Tags={s3Tags}
                />
            </Paper>
        </Link>
    );
};

export default withStyles(styles)(VolcanoCard);
