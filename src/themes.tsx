import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import { deepPurple, blueGrey, grey, indigo } from '@mui/material/colors';

export const colorToPaletteColorOptions = (color: string) => {
    return {
        main: color,
    } as PaletteColorOptions;
};

export const lightTheme = createTheme({
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: colorToPaletteColorOptions(indigo[400]),
        secondary: colorToPaletteColorOptions(indigo[500]),
        secondaryButton: colorToPaletteColorOptions(indigo[500]),
        background: {
            default: grey[600],
            paper: grey[400],
        },
        text: {
            primary: '#000',
        }
    },
});

export const darkTheme = createTheme({
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: colorToPaletteColorOptions(deepPurple[700]),
        secondary: colorToPaletteColorOptions(indigo[400]),
        secondaryButton: colorToPaletteColorOptions(indigo[400]),
        background: {
            default: grey[900],
            paper: grey[800],
        },
        text: {
            primary: '#fff',
        }
    },
});

declare module "@mui/material/styles" {
    interface Palette {
        secondaryButton: PaletteColorOptions | undefined;
    }
    interface PaletteOptions {
        secondaryButton: PaletteColorOptions | undefined;
    }
}

declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        secondaryButton: true;
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        secondaryButton: true;
    }
}