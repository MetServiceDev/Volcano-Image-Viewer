import React from 'react';
import { Volcano } from '../../api/volcano/headers';

const VolcanoContext = React.createContext<Volcano[]>([]);

export default VolcanoContext;
