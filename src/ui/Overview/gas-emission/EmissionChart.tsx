import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Paper, Button, Typography } from '@material-ui/core';


const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4),
        width: '45%',
        cursor: 'pointer'
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
}

const EmissionChart: React.FC<Props> = ({ classes, src, element, csvLink, open, title }) => {
    const linkRef = React.useRef<HTMLAnchorElement>(null);
    return (
        <Paper className={classes.root} elevation={3} onClick={open}>
            <div className={classes.header}>
                <Typography variant='h5'>{title}</Typography>
                <Button
                    className={classes.button}
                    onClick={() => linkRef.current?.click()}
                >
                    Export to CSV
                </Button>
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
        </Paper>
    );
};

export default withStyles(styles)(EmissionChart);
