import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Grow } from '@material-ui/core';

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
    domesticVolcano: boolean,
    FIT_ID?: string,
}

const GNSCharts: React.FC<Props> = ({ classes, src, domesticVolcano, FIT_ID }) => {
    const [currentImg, setImg] = React.useState<string>(domesticVolcano ? `${src}-drum.png` : src);
    const [header, setHeader] = React.useState<string>('Drum Plot');

    const sulfurSrc = `https://fits.geonet.org.nz/plot?siteID=${FIT_ID}000&typeID=SO2-flux-a&type=scatter&showMethod=true`;

    const select = (src:string, header:string) => () => {
        setImg(src);
        setHeader(header);
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography variant='h5'>
                    {header}
                </Typography>
                <img
                    src={currentImg}
                    className={classes.mainImg}
                    alt="Current display"
                />
                <div className={classes.bottomImgs}>
                    <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                        <img
                            src={domesticVolcano ? `${src}-drum.png` : src}
                            className={classes.imgThumb}
                            onClick={select(domesticVolcano ? `${src}-drum.png` : src, 'Drum Plot')}
                            alt="Drum Plot"
                        />
                    </Grow>
                    {domesticVolcano &&
                        <Grow in={true} {...(true ? { timeout: 2000 } : {})}>
                            <img
                                alt="RSAM & SSAM"
                                src={`${src}-combined.png`}
                                className={classes.imgThumb}
                                onClick={select(`${src}-combined.png`, 'RSAM & SSAM')}
                            />
                        </Grow>}
                    {FIT_ID &&
                        <Grow in={true} {...(true ? { timeout: 3000 } : {})}>
                            <img
                                alt="Sular Plot"
                                src={sulfurSrc}
                                className={classes.imgThumb}
                                onClick={select(sulfurSrc, 'Sulphur Dioxide')}
                            />
                        </Grow>}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(GNSCharts);
