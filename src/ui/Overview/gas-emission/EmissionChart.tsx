import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Paper, Typography, IconButton, Collapse, Tooltip } from '@material-ui/core';

import BarChartIcon from '@mui/icons-material/BarChart';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import { EmissionMeasures } from '../../../api/volcano/headers';
import EmissionTable from './EmissonsTable';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        width: '45%',
        display: 'inline-block'
    },
    img: {
        width: '100%',
    },
    button: {
        border: `1px solid ${theme.palette.primary.main}`,
        textTransform: 'none',
        color: theme.palette.primary.main,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1)
    }
});

interface Props extends WithStyles<typeof styles> {
    src: string;
    element: string;
    csvLink: string;
    open: () => void;
    title: string;
    emissionData?: EmissionMeasures
}

const EmissionChart: React.FC<Props> = ({ classes, src, element, csvLink, open, title, emissionData }) => {
    const linkRef = React.useRef<HTMLAnchorElement>(null);
    const [displayTable, toggleTable] = React.useState<boolean>(false);

    const headerIcon = (title:string, icon: JSX.Element, action: () => void) => {
        return (
            <Tooltip title={title} arrow>
                <IconButton onClick={action}>
                    {icon}
                </IconButton>
            </Tooltip>
        );
    };

    return (
        <Paper className={classes.root} elevation={3}>
            <div className={classes.header}>
                <Typography variant='h5'>{title}</Typography>
                <div>
                    {emissionData && headerIcon('Show Table', <BarChartIcon/>, () => toggleTable(!displayTable))}
                    {headerIcon('Full Screen', <FullscreenIcon/>, open)}
                    {headerIcon('Download to CSV', <FileDownloadIcon/>, () => linkRef.current?.click())}
                </div>
            </div>
            <img
                src={src}
                alt={element}
                className={classes.img}
            />
            <a
                href={csvLink}
                hidden={true}
                ref={linkRef}
                download
            >download</a>
            {emissionData &&
                <Collapse in={displayTable}>
                    <EmissionTable
                        element={element}
                        emissionData={emissionData}
                    />
                </Collapse>
            }
        </Paper>
    );
};

export default withStyles(styles)(EmissionChart);
