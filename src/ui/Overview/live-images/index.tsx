import React from 'react';
import { Grow, Typography, Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';

import VolcanoThumbnails from '../../ReusedComponents/VolcanoThumbnails';
import { Volcano, VolcanoLocation } from '../../../api/volcano/headers';
import formatThumbnailData from '../../../api/volcano/formatThumbnail';
import { imageBucket } from '../../../metadata/Endpoints';
import RelatedVolcano from './RelatedVolcano';

const styles = (theme:Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    thumnbailWrapper: {
        width: '60%',
    },
    relatedVolcanoes: {
        width: '10%',
        marginRight: theme.spacing(4)
    },
    sideItem: {
        width: '100%',
        marginBottom: theme.spacing(4)
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        textAlign: 'center'
    }
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano,
    volcanoes: Volcano[]
}

const LiveImages: React.FC<Props> = ({ classes, volcano, volcanoes }) => {

    const domesticVolcano = volcano.location !== VolcanoLocation.VANUATU && volcano.code !== 'ERB';

    const fetchSrc = (code: string, s3Tag?: string) => {
        if (!domesticVolcano) {
            const { src } = formatThumbnailData(code, '12', false, `${imageBucket}/${s3Tag}/${s3Tag}`);
            return src;
        } else {
            const date = moment().utc();
            date.subtract('minutes', 10).format('H:mm');
            const { src } = formatThumbnailData(code, date, true);
            return src;
        }
    }

    const relatedVolcanoes = () => {
        return (
            <div className={classes.relatedVolcanoes}>
                {volcano?.relatedVolcanoes?.map((code, index) => {
                    const volc = volcanoes.find(v => v.code === code) as Volcano || {}
                    const imgSrc = fetchSrc(code, volc?.s3Link);
                    return (
                        <RelatedVolcano
                            volcano={volc}
                            index={index}
                        />
                    )
                })}
            </div>
        ) 
    }


    return (
        <div className={classes.root}>
            <div className={classes.thumnbailWrapper}>
                <VolcanoThumbnails
                    volcano={volcano}
                />      
            </div>
            {relatedVolcanoes()}
        </div>
    )
};

export default withStyles(styles)(LiveImages);