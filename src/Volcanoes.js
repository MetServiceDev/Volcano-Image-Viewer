export const Volcanoes = [
    {
        name:'Ambrym',
        code:'AMB1',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/AMB1_drumplot.jpg',
        relatedVolcanoes: ['LVVL', 'LPV', 'YASH'],
        location:'Vanuatu',
        s3Link: 'AMB1',
    },
    {
        name: 'Aoba',
        code: 'LVVL',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/ABNG_drumplot.jpg',
        relatedVolcanoes: ['AMB1', 'LPV', 'YASH'],
        location:'Vanuatu',
        s3Link: 'LVVL',
    },
    {
        name: 'Lopevi',
        code: 'LPV',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/LPV_drumplot.png',
        relatedVolcanoes: ['AMB1', 'LVVL', 'YASH'],
        location:'Vanuatu',
        s3Link: 'LPV',
    },
    {
        name: 'Yasur',
        code: 'YASH',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/YASH_drumplot.jpg',
        relatedVolcanoes: ['AMB1', 'LVVL', 'LPV'],
        location:'Vanuatu',
        s3Link: 'YASH',
    },
    {
        name: 'Taranaki',
        code: 'TKI',
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/pke-seismic-drum.png',
        location:'NZ',
        s3Link: 'taranaki'
    },
    {
        name: 'Ngauruhoe',
        code: 'NG',
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/otvz-seismic-drum.png',
        relatedVolcanoes: ['NGRU', 'RUN', 'RUS'],
        location:'Central NI',
        s3Link: 'ngauruhoe'
    },
    {
        name: 'Ngauruhoe Ruapehu',
        code: 'NGRU',
        relatedVolcanoes: ['NG', 'RUN', 'RUS'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/otvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'ruapehungauruhoe'
    },
    {
        name: 'Ruapehu North',
        code: 'RUN',
        relatedVolcanoes: ['NGRU', 'NG', 'RUS'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wnvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'ruapehunorth'
    },
    {
        name: 'Ruapehu South',
        code: 'RUS',
        relatedVolcanoes: ['NGRU', 'NG', 'RUN'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wnvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'ruapehusouth'
    },
    {
        name: 'Tongariro',
        code: 'TNG',
        relatedVolcanoes: ['TMC'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/tmvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'tongariro'
    },
    {
        name: 'Tongariro Te Maari Crater',
        code: 'TMC',
        relatedVolcanoes: ['TNG'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/tmvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'tongarirotemaaricrater'
    },
    {
        name: 'White Island',
        code: 'WI',
        relatedVolcanoes: ['WICF', 'WICR', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whakatane'
    },
    {
        name: 'White Island Crater Floor',
        code: 'WICF',
        relatedVolcanoes: ['WI', 'WICR', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandcraterfloor'
    },
    {
        name: 'White Island Crater Rim',
        code: 'WICR',
        relatedVolcanoes: ['WI', 'WICF', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandcraterrim'
    },
    {
        name: 'White Island West Rim',
        code: 'WIWR',
        relatedVolcanoes: ['WI', 'WICF', 'WICR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandwestrim'
    },
    {
        name:'Raoul Island',
        code: 'RI',
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/riz-seismic-drum.png',
        location:'NZ',
        s3Link: 'raoulisland'
    },
    {
        name: 'Erebus',
        code:'ERB',
        location:'NZ',
        s3Link: 'erebus',
    },
];