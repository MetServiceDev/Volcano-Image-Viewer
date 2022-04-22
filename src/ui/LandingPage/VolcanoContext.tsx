import React from 'react';
import { Volcano } from '@metservice/aviationtypes';

const VolcanoContext = React.createContext<Volcano[]>([]);

export default VolcanoContext;
