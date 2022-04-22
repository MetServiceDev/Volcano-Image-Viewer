import { createTheme } from '@material-ui/core/styles';
import colorPalette from './ColorPalette'

const appTheme = (darkMode:boolean) => {
    return createTheme({
        palette: {
            type: !darkMode ? 'light' : 'dark',
            primary : { ...colorPalette }
        }
    })
};

export default appTheme;