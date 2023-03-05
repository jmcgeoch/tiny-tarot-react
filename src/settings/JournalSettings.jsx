import { useState } from 'react';
import { FormGroup, FormControlLabel, ThemeProvider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Palette from '../resources/MuiPalette.tsx'

export default function JournalSettings() {
    const [updated, setUpdated] = useState(false);

    return (
        <ThemeProvider theme={Palette} >
            <div className='page' style={ { height: '100%'}}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} 
                    label="Show card keywords" />
                    <FormControlLabel control={<Checkbox />} 
                    label="Show journal timestamps" />
                </FormGroup>
                <div>
                <button className={`action-button ${!updated ? 'inactive' : ''}`}
                    style={{ marginRight: 10 }}
                    onClick={() => { }}>
                    <b>Save</b>
                </button>
                <button className='action-button'
                    onClick={() => { }}>
                    <b>Cancel</b>
                </button>
            </div>
            </div>
        </ThemeProvider>
    )
}