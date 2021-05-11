import { endpoint } from './ServerEndpoint';

export const ExternalLinks = [
    {
        title: 'NOAA/CIMSS Observations',
        li:[
            [
                {
                    name: 'Vanuatu North RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Vanuatu_North_500_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:240'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Vanuatu_North_500_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:240'
                }
            ],
            [
                {
                    name: 'Vanuatu South RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Vanuatu_South_500_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:240'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Vanuatu_South_500_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:240'
                }
            ],
            [
                {
                    name: 'Vanuatu Large Area',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Vanuatu_3_km::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:240'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Vanuatu_3_km::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:240'
                }
            ],
            [
                {
                    name: 'Tinakula RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Tinakula_500_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:240'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Tinakula_500_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:240'
                }
            ],
            [
                {
                    name: 'Hunga Tongo RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Hunga_Tonga_250_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:720'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Hunga_Tonga_250_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:720'
                }
            ],
            [
                {
                    name: 'American Samoa RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:American_Samoa_750_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:240'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:American_Samoa_750_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:240'
                }
            ],
            [
                {
                    name: 'Fiji RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Fiji_1_km::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:240'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Fiji_1_km::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:240'
                }
            ],
            [
                {
                    name: 'Kermadec Islands RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Kermadec_Islands_750_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:720'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Kermadec_Islands_750_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:720'
                }
            ],
            [
                {
                    name: 'New Zealand RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:New_Zealand_1_km::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:240'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:New_Zealand_1_km::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:240'
                }
            ],
            [
                {
                    name: 'Mt Erebus RGB',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Mt_Erebus_500_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um::endtime:latest::daterange:1440'
                },
                {
                    name: 'Ash 4 Panel',
                    link: 'https://volcano.ssec.wisc.edu/imagery/view/#sector:Mt_Erebus_500_m::instr:all::sat:all::image_type:RGB1112or13um_3911um_11um_Ash_Retv::endtime:latest::daterange:1440'
                }
            ]
        ]
    },
    {
        title: 'Internal Links',
        li:[
            [
                {
                    name: 'Active VAAs',
                    link: 'http://vaac.metservice.com/dynamic/wellington.html'
                },
            ],
            [
                {
                    name: 'Wellington VAAC Wiki page',
                    link: 'http://wiki.met.co.nz/display/FCSTOPS/Wellington+VAAC'
                },
            ],
            [
                {
                    name: 'VAAC Monitoring Page-Current Duty Officers',
                    link: 'http://wiki.met.co.nz/display/FCSTOPS/VAAC+Monitoring'
                },
            ],
            [
                {
                    name: 'Current VAAC activity log',
                    link: 'http://wiki.met.co.nz/display/FCSTOPS/VAAC+activity+log+-+2019'
                },
            ],
            [
                {
                    name: 'Dealing with a Volcanic Eruption',
                    link: 'http://wiki.met.co.nz/pages/viewpage.action?pageId=39651176'
                }
            ]
        ]
    },
    {
        title: 'VAAC Loopy Favourites',
        li: [
            [
                {name: 'Vanuatu'}
            ],
            [
                {
                    name: 'True Color',
                    link: `${endpoint}/VAAC/Vanuatu/Vanuatu True-colour10min.LPY`
                },
                {
                    name: 'Ash',
                    link: `${endpoint}/VAAC/Vanuatu/Vanuatu Ash 10min - EU.LPY`
                },
                {
                    name: 'Dust',
                    link: `${endpoint}/VAAC/Vanuatu/Vanuatu Dust 10min.LPY`
                }
            ],
            [
                {name: 'Tonga'}
            ],
            [
                {
                    name: 'True Color',
                    link: `${endpoint}/VAAC/Tonga/Tonga True-Colour 10min.LPY`
                },
                {
                    name: 'Ash',
                    link: `${endpoint}/VAAC/Tonga/Tonga Ash 10min - EU.LPY`
                },
                {
                    name: 'Dust',
                    link: `${endpoint}/VAAC/Tonga/Tonga Dust 10min.LPY`
                }
            ],
            [
                {name: 'Tropics'}
            ],
            [
                {
                    name: 'True Color',
                    link: `${endpoint}/VAAC/Tropics True Colour 10min.LPY`
                },
                {
                    name: 'Ash',
                    link: `${endpoint}/VAAC/Tropics Ash 10min - EU.LPY`
                },
                {
                    name: 'Dust',
                    link: `${endpoint}/VAAC/Tropics Dust 10min.LPY`
                }
            ],
            [
                {name: 'NZ/Tasman'}
            ],
            [
                {
                    name: 'True Color',
                    link: `${endpoint}/RGB/NZ True-Colour 10min .LPY`
                },
                {
                    name: 'Ash',
                    link: `${endpoint}/VAAC/NWPTAS Ash RGB 10min.LPY`
                },
                {
                    name: 'Dust',
                    link: `${endpoint}/VAAC/NWPTAS Dust 10min.LPY`
                }
            ],
        ]
    },
    {
        title: 'Google Earth',
        li: [
            [
                {
                    name: 'WWLLN Data',
                    link: `${endpoint}/WWLLN.kmz`
                }
            ]
        ]
    }
]