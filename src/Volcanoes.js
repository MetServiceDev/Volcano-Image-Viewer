export const Volcanoes = [
    {
        name:'Ambrym',
        code:'AMB1',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/AMB1_drumplot.jpg',
        relatedVolcanoes: ['LVVL', 'LPV', 'YASH'],
        location:'Vanuatu',
        s3Link: 'AMB1',
        mountain: 'Ambrym',
        coordinates: {
            lat: -16.249999,
            long: 168.1166662
        }
    },
    {
        name: 'Aoba',
        code: 'LVVL',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/ABNG_drumplot.jpg',
        relatedVolcanoes: ['AMB1', 'LPV', 'YASH'],
        location:'Vanuatu',
        s3Link: 'LVVL',
        mountain: 'Aoba',
        coordinates: {
            lat: -15.3999984, 
            long: 167.83333
        },
    },
    {
        name: 'Lopevi',
        code: 'LPV',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/LPV_drumplot.png',
        relatedVolcanoes: ['AMB1', 'LVVL', 'YASH'],
        location:'Vanuatu',
        s3Link: 'LPV',
        mountain: 'Lopevi',
        coordinates: {
            lat: -16.503997984, 
            long: 168.34083197
        }
    },
    {
        name: 'Yasur',
        code: 'YASH',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/YASH_drumplot.jpg',
        relatedVolcanoes: ['AMB1', 'LVVL', 'LPV'],
        location:'Vanuatu',
        s3Link: 'YASH',
        mountain: 'Yasur',
        coordinates: {
            lat: -19.523664572, 
            long: 169.442331564
        }
    },
    {
        name: 'Taranaki',
        code: 'TKI',
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/pke-seismic-drum.png',
        location:'NZ',
        s3Link: 'taranaki',
        mountain: 'Taranaki',
        coordinates: {
            lat: -39.296389,
            long: 174.064722
        }
    },
    {
        name: 'Ngauruhoe',
        code: 'NG',
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/otvz-seismic-drum.png',
        relatedVolcanoes: ['NGRU', 'RUN', 'RUS'],
        location:'Central NI',
        s3Link: 'ngauruhoe',
        mountain: 'Ngauruhoe',
        coordinates: {
            lat: -39.156833, 
            long: 175.632167
        }
    },
    {
        name: 'Ngauruhoe Ruapehu',
        code: 'NGRU',
        relatedVolcanoes: ['NG', 'RUN', 'RUS'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/otvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'ruapehungauruhoe',
        mountain: 'Ngauruhoe',
        coordinates: {
            lat: -39.156833, 
            long: 175.632167
        }
    },
    {
        name: 'Ruapehu North',
        code: 'RUN',
        relatedVolcanoes: ['NGRU', 'NG', 'RUS'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wnvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'ruapehunorth',
        mountain: 'Ruapehu',
        coordinates: {
            lat: -39.283333, 
            long: 175.566667
        }
    },
    {
        name: 'Ruapehu South',
        code: 'RUS',
        relatedVolcanoes: ['NGRU', 'NG', 'RUN'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wnvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'ruapehusouth',
        mountain: 'Ruapehu',
        coordinates: {
            lat: -39.283333, 
            long: 175.566667
        }
    },
    {
        name: 'Tongariro',
        code: 'TNG',
        relatedVolcanoes: ['TMC'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/tmvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'tongariro',
        mountain: 'Tongariro',
        coordinates: {
            lat: -39.1333328,
            long: 175.6499974 
        }
    },
    {
        name: 'Tongariro Te Maari Crater',
        code: 'TMC',
        relatedVolcanoes: ['TNG'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/tmvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'tongarirotemaaricrater',
        mountain: 'Tongariro',
        coordinates: {
            lat: -39.1333328,
            long: 175.6499974 
        }
    },
    {
        name: 'White Island',
        code: 'WI',
        relatedVolcanoes: ['WICF', 'WICR', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whakatane',
        mountain: 'White Island',
        coordinates: {
            lat: -37.52,
            long: 177.1825
        }
    },
    {
        name: 'White Island Crater Floor',
        code: 'WICF',
        relatedVolcanoes: ['WI', 'WICR', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandcraterfloor',
        mountain: 'White Island',
        coordinates: {
            lat: -37.52,
            long: 177.1825
        }
    },
    {
        name: 'White Island Crater Rim',
        code: 'WICR',
        relatedVolcanoes: ['WI', 'WICF', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandcraterrim',
        mountain: 'White Island',
        coordinates: {
            lat: -37.52,
            long: 177.1825
        }
    },
    {
        name: 'White Island West Rim',
        code: 'WIWR',
        relatedVolcanoes: ['WI', 'WICF', 'WICR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandwestrim',
        mountain: 'White Island',
        coordinates: {
            lat: -37.52,
            long: 177.1825
        }
    },
    {
        name:'Raoul Island',
        code: 'RI',
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/riz-seismic-drum.png',
        location:'NZ',
        s3Link: 'raoulisland',
        mountain: 'Kermadec Islands',
        coordinates: {
            lat: -29.266667,
            long: -177.916667
        }
    },
    {
        name: 'Erebus',
        code:'ERB',
        location:'NZ',
        s3Link: 'erebus',
        coordinates: {
            lat: -77.529722,
            long: 167.153333
        }
    },
];