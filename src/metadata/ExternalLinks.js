import { loopyBucket } from './Endpoints';

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
            ],
            [
                {
                    name: 'Vanuatu Metars & Tafs',
                    link: 'https://www.aviationweather.gov/metar/data?ids=NVVW%2C+NVVV%2C+NVVA%2C+NVSS%2C+NVSL%2C+NVSG%2C+NVSC&format=raw&date=0&hours=3&taf=on'
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
                    link: `${loopyBucket}/Vanuatu+True-colour10min.LPY`
                },
                {
                    name: 'Ash',
                    link: `${loopyBucket}/Vanuatu+Ash+10min+-+EU.LPY`
                },
                {
                    name: 'Dust',
                    link: `${loopyBucket}/Vanuatu+Dust+10min.LPY`
                }
            ],
            [
                {name: 'Tonga'}
            ],
            [
                {
                    name: 'True Color',
                    link: `${loopyBucket}/Tonga+True-Colour+10min.LPY`
                },
                {
                    name: 'Ash',
                    link: `${loopyBucket}/Tonga+Ash+10min+-+EU.LPY`
                },
                {
                    name: 'Dust',
                    link: `${loopyBucket}/Tonga+Dust+10min.LPY`
                }
            ],
            [
                {name: 'Tropics'}
            ],
            [
                {
                    name: 'True Color',
                    link: `${loopyBucket}/Tropics+True+Colour+10min.LPY`
                },
                {
                    name: 'Ash',
                    link: `${loopyBucket}/Tropics+Ash+10min+-+EU.LPY`
                },
                {
                    name: 'Dust',
                    link: `${loopyBucket}/Tropics+Dust+10min.LPY`
                }
            ],
            [
                {name: 'NZ/Tasman'}
            ],
            [
                {
                    name: 'True Color',
                    link: `${loopyBucket}/NZ+True-Colour+10min+.LPY`
                },
                {
                    name: 'Ash',
                    link: `${loopyBucket}/NWPTAS+Ash+RGB+10min.LPY`
                },
                {
                    name: 'Dust',
                    link: `${loopyBucket}/NWPTAS+Dust+10min.LPY`
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
                    link: `${loopyBucket}/WWLLN.kmz`
                }
            ]
        ]
    }
]