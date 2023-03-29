import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import { deepPurple, blueGrey, indigo, grey} from '@mui/material/colors';

const colorToPaletteColorOptions = (color: string) => {
    return {
        main: color,
    } as PaletteColorOptions;
};

export const lightTheme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: deepPurple,
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: colorToPaletteColorOptions(indigo[900]),
        secondary: deepPurple,
        background: {
            default: grey[900],
            paper: grey[800],
        },
        text: {
            primary: '#fff',
        }
    },
});

