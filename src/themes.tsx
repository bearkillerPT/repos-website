import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import { deepPurple, blueGrey, grey } from '@mui/material/colors';

export const colorToPaletteColorOptions = (color: string) => {
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
        primary: colorToPaletteColorOptions("#111"),
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

