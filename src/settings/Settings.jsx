import { ThemeProvider } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Palette from '../resources/MuiPalette.tsx';
import JournalSettings from './JournalSettings';
import './Settings.css';
import SpreadPicker from "./SpreadPicker";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div className='tabpanel'
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Settings() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const selectedSpreads = state.spreads;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const close = () => {
        navigate(-1);
    }

    return (
        <div className="App-body">
            <ThemeProvider theme={Palette} >
                <Tabs value={value} onChange={handleChange}
                    aria-label="basic tabs example" >
                    <Tab label="Tarot Spreads" />
                    <Tab label="Journal" />
                    <Tab label="Account" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <SpreadPicker spreadList={selectedSpreads} close={close} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <JournalSettings />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </ThemeProvider>
        </div>
    )
}