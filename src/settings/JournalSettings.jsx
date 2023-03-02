import { FormGroup, FormControlLabel, ThemeProvider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Palette from '../resources/MuiPalette.tsx'

export default function JournalSettings() {

    return (
        <ThemeProvider theme={Palette} >
            <div className='page' style={ { height: '100%'}}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} 
                    label="Show card keywords" />
                    <FormControlLabel control={<Checkbox />} 
                    label="Show journal timestamps" />
                </FormGroup>
            </div>
        </ThemeProvider>
    )
}