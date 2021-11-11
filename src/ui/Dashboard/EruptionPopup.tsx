import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { Volcano } from '../../api/volcano/headers';

interface Props {
    volcano: Volcano;
    intensity: string
}

const EruptionPopup: React.FC<Props> = ({ volcano, intensity }) => {
    return (
        <Snackbar autoHideDuration={6000}>
            <Alert severity="warning">
                A {intensity} earthquake occured near {volcano} today
            </Alert>
        </Snackbar>
    )
};

export default EruptionPopup;
