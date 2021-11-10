import React from 'react';
import { Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import VolcanoThumbnails from '../../ReusedComponents/VolcanoThumbnails';
import { Volcano } from '../../../api/volcano/headers';
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
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano,
    volcanoes: Volcano[]
}

const LiveImages: React.FC<Props> = ({ classes, volcano, volcanoes }) => {

    const relatedVolcanoes = () => {
        return (
            <div className={classes.relatedVolcanoes}>
                {volcano?.relatedVolcanoes?.map((code, index) => {
                    const volc = volcanoes.find(v => v.code === code) as Volcano || {};
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
