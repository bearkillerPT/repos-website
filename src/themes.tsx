import { createTheme, makeStyles } from '@mui/material/styles';
import { orange, deepPurple, blueGrey } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: deepPurple,
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: orange,
        secondary: deepPurple,
    },
});

