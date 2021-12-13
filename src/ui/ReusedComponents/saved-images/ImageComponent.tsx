import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Typography, Theme, Tooltip, Checkbox } from '@material-ui/core';
import moment from 'moment';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: theme.spacing(4)
    },
    previewText: {
        fontSize: '14px'
    },
    imgThumbnail: {
        cursor: 'pointer'
    },
    checkbox: {
        position: 'relative',
        bottom: '85%',
        left: '12%'
    },
});

interface Props extends WithStyles<typeof styles> {
    imgLink: string;
    selected: boolean;
    volcanoName: string;
    selectImage: any;
    openPopup: any;
    src: string;
    title: string;
    timestamp: Date;
    imgWidth?: string
}

const ImageComponent: React.FC<Props> = ({ classes, imgLink, selected, volcanoName, openPopup, selectImage, src, title, timestamp, imgWidth }) => {
    return (
        <div className={classes.root} key={imgLink}>
            <Tooltip title={title} arrow>
                <img
                    src={src}
                    alt={imgLink}
                    width={imgWidth ?? '25%'}
                    className={classes.imgThumbnail}
                    onClick={openPopup}
                />
            </Tooltip>
            <Typography
                variant="subtitle1"
                className={classes.previewText}
            >
                {volcanoName} - {moment(timestamp).format('MMM Do YYYY')}
            </Typography>
            <Checkbox
                className={classes.checkbox}
                color="primary"
                onChange={selectImage}
                checked={selected}
            />
        </div>  
    );
};

export default withStyles(styles)(ImageComponent);
