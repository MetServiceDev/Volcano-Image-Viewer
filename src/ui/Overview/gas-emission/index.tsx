import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Observation, EmissionElements } from '@metservice/aviationtypes';

import EmissionChart from './EmissionChart';
import PopupChart from './PopupChart';
import { FITS_ENDPOINT } from '../../../metadata/Endpoints';

const styles = (theme: Theme) => createStyles({
    root: {
        height: '100vh',
        position: 'fixed',
        backgroundColor: theme.palette.background.default,
        width: theme.spacing(5),
    },
    wrapper: {
        // flexWrap: 'wrap',
        // justifyContent: 'space-between'
    }
});

interface Props extends WithStyles<typeof styles> {
    FIT_ID: string;
    emissionData?: any;
}

interface SelectedChart {
    src: string;
    title: string;
    dataLink: string;
}

const formatTitle = (element: EmissionElements): string => {
    switch(element) {
        case EmissionElements.SO2:
            return 'Sulphur Dioxide';
        case EmissionElements.CO2:
            return 'Carbon Dioxide';
        case EmissionElements.H2S:
            return 'Hydrogen Sulphide';
    }
}

const GasEmission: React.FC<Props> = ({ classes, FIT_ID, emissionData }) => {
    const linkRef = React.useRef<HTMLAnchorElement>(null);

    const imgSrc = (gas: string) => `${FITS_ENDPOINT}/plot?siteID=${FIT_ID}000&typeID=${gas}-flux-a`;
    const csvLink = (gas: string) => `${FITS_ENDPOINT}/observation?typeID=${gas}-flux-a&siteID=${FIT_ID}000`;

    const [selectedChart, setSelected] = React.useState<SelectedChart>();
    const [expaned, toggleExpand] = React.useState<boolean>(false);

    const openPopup = (details: any) => {
        toggleExpand(true);
        setSelected(details);
    };

    const renderGraphs = () => {
        return (
            <div className={classes.wrapper}>
                {Object.values(EmissionElements).map(gas => {
                    const src = imgSrc(gas);
                    
                    const title = formatTitle(gas);
                    const dataLink = csvLink(gas);
                    const emissionMeasures = emissionData?.emissions[gas] as Observation[];
                    return (
                        <EmissionChart
                            key={gas}
                            src={src}
                            open={(graphOptions) => {
                                const details = {
                                    src: `${src}&days=${graphOptions.dayLength}&type=${graphOptions.plotType}&showMethod=true`,
                                    dataLink,
                                    title
                                }
                                openPopup(details);
                            }}
                            element={gas}
                            csvLink={dataLink}
                            title={title}
                            emissionMeasures={emissionMeasures}
                        />
                    )
                })}
                
            </div>
        );
    };

    return (
        <>
            {renderGraphs()}
            <PopupChart
                handleClose={() => toggleExpand(false)}
                open={expaned}
                src={selectedChart?.src  as string}
                title={selectedChart?.title as string}
                download={() => linkRef.current?.click()}
            />
            <a
                href={selectedChart?.dataLink}
                hidden={true}
                ref={linkRef}
                download
            >download</a>
        </>
    )
};

export default withStyles(styles)(GasEmission);
