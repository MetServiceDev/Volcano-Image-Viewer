import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    container: {
        width: '50%',
        margin: 'auto'
    },
    mainImg: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    bottomImgs: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    imgThumb: {
        width: '25%',
        transition: '0.25s',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: `2px 2px 2px ${theme.palette.primary.dark}`,
            opacity: '1',
        },
    },
});


interface Props extends WithStyles<typeof styles> {
    src: string,
    domesticVolcano: boolean
}

const GNSCharts: React.FC<Props> = ({ classes, src, domesticVolcano }) => {
    const [currentImg, setImg] = React.useState<string>(domesticVolcano ? `${src}-drum.png` : src);
    const [img1, toggleImg] = React.useState<boolean>(true);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography variant='h5'>
                    {img1 ? 'Drum Plot' : 'RSAM & SSAM'}
                </Typography>
                <img
                    src={currentImg}
                    className={classes.mainImg}
                />
                <div className={classes.bottomImgs}>
                    <img
                        src={domesticVolcano ? `${src}-drum.png` : src}
                        className={classes.imgThumb}
                        style={{ opacity: img1 ? '1' : '0.5' }}
                        onClick={() => { setImg(domesticVolcano ? `${src}-drum.png` : src); toggleImg(true); }}
                    />
                    {domesticVolcano &&
                        <img
                            src={`${src}-combined.png`}
                            className={classes.imgThumb}
                            style={{ opacity: !img1 ? '1' : '0.5' }}
                            onClick={() => { setImg(`${src}-combined.png`); toggleImg(false); }}
                        />}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(GNSCharts);
