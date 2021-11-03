import { createTheme } from '@material-ui/core/styles';

const appTheme = (darkMode:boolean) => {
    return createTheme({
        palette: {
            type: !darkMode ? 'light' : 'dark',
            primary : {
                main: '#ffbb00',
                dark: 'rgba(255, 187, 0, 0.5)',
                light: '#ffe369'
            }
        }
    })
};

export default appTheme;