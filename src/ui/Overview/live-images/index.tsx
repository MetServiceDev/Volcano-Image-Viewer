import React from 'react';
import { useSelector } from 'react-redux';
import { Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import VolcanoThumbnails from '../../ReusedComponents/VolcanoThumbnails';
import { Volcano } from '../../../api/volcano/headers';
import RelatedVolcano from './RelatedVolcano';
import { AppState } from '../../../redux/store';
import formatS3Tags from '../../../api/images/formatS3Tags';

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
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano,
    volcanoes: Volcano[]
}

const LiveImages: React.FC<Props> = ({ classes, volcano, volcanoes }) => {
    const allS3Tags = useSelector((state:AppState) => state.s3ImageTags);
    const s3Tags = formatS3Tags(allS3Tags, volcano.code);

    const relatedVolcanoes = () => {
        return (
            <div className={classes.relatedVolcanoes}>
                {volcano?.relatedVolcanoes?.map((code, index) => {
                    const volc = volcanoes.find(v => v.code === code) as Volcano;
                    return (
                        <>
                            {volc && <RelatedVolcano
                                volcano={volc}
                                index={index}
                            />}
                        </>
                    )
                })}
            </div>
        ) 
    }

    return (
        <div className={classes.root}>
            <div className={classes.thumnbailWrapper}>
                {volcano.code && <VolcanoThumbnails
                    volcano={volcano}
                    s3Tags={s3Tags}
                />}
            </div>
            {relatedVolcanoes()}
        </div>
    )
};

export default withStyles(styles)(LiveImages);
