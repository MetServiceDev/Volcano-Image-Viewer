export const Volcanoes = [
    {
        name:'Ambrym',
        code:'AMB1',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/AMB1_drumplot.jpg',
        relatedVolcanoes: ['LVVL', 'LPV', 'YASH'],
        location:'Vanuatu'
    },
    {
        name: 'Aoba',
        code: 'LVVL',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/ABNG_drumplot.jpg',
        relatedVolcanoes: ['AMB1', 'LPV', 'YASH'],
        location:'Vanuatu'
    },
    {
        name: 'Lopevi',
        code: 'LPV',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/LPV_drumplot.png',
        relatedVolcanoes: ['AMB1', 'LVVL', 'YASH'],
        location:'Vanuatu'
    },
    {
        name: 'Yasur',
        code: 'YASH',
        drumLink: 'https://www.vmgd.gov.vu/vmgdMedia/geoHazard/drumplots/YASH_drumplot.jpg',
        relatedVolcanoes: ['AMB1', 'LVVL', 'LPV'],
        location:'Vanuatu'
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
        name: 'Ngauruhoe_Ruapehu',
        displayName: 'Ngauruhoe Ruapehu',
        code: 'NGRU',
        relatedVolcanoes: ['NG', 'RUN', 'RUS'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/otvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'ruapehungauruhoe'
    },
    {
        name: 'Ruapehu_N',
        displayName: 'Ruapehu North',
        code: 'RUN',
        relatedVolcanoes: ['NGRU', 'NG', 'RUS'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wnvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'ruapehunorth'
    },
    {
        name: 'Ruapehu_S',
        displayName: 'Ruapehu South',
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
        name: 'Tongariro_TMC',
        displayName: 'Tongariro Te Maari Crater',
        code: 'TMC',
        relatedVolcanoes: ['TNG'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/tmvz-seismic-drum.png',
        location:'Central NI',
        s3Link: 'tongarirotemaaricrater'
    },
    {
        name: 'White_Island',
        displayName: 'White Island',
        code: 'WI',
        relatedVolcanoes: ['WICF', 'WICR', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whakatane'
    },
    {
        name: 'White_Island_CF',
        displayName: 'White Island Crater Floor',
        code: 'WICF',
        relatedVolcanoes: ['WI', 'WICR', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandcraterfloor'
    },
    {
        name: 'White_Island_CR',
        displayName: 'White Island Crater Rim',
        code: 'WICR',
        relatedVolcanoes: ['WI', 'WICF', 'WIWR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandcraterrim'
    },
    {
        name: 'White_Island_WR',
        displayName: 'White Island West Rim',
        code: 'WIWR',
        relatedVolcanoes: ['WI', 'WICF', 'WICR'],
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/wsrz-seismic-drum.png',
        location:'WI',
        s3Link: 'whiteislandwestrim'
    },
    {
        name:'Raoul_Island',
        displayName: 'Raoul Island',
        code: 'RI',
        drumLink: 'https://images.geonet.org.nz/volcano/drums/latest/riz-seismic-drum.png',
        location:'NZ',
        s3Link: 'raoulisland'
    },
    {
        name: 'Erebus',
        code:'ERB',
        location:'NZ'
    },
];