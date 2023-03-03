import './NewPage.css';
import Palette from '../resources/MuiPalette.tsx';
import { ThemeProvider } from '@mui/material';
import Card from '../cards/Card';
import FreeSoloCreateOption from './ChipInput';
import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function NewPage() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const journalCards = state.cards;
    const journalSpread = state.spread;
    let jsonJournalEntry = {};

    function prettyDateTime() {
        const now = new Date();
        const monthName = new Intl.DateTimeFormat("en-US", { month: 'long' }).format(now);
        return (monthName + ' ' + now.getDate() + ' ' + now.getFullYear());
    }

    function cancelNewPage() {
        navigate(-1);
    }

    return (
        <div className='Journal-body'>
            <div className='cards' style={{ maxHeight: 'none' }}>
                {
                    journalCards.map((card, index) => (
                        <span className='entryCard' key={card.name}>
                            <h1 className='positionName'>{journalSpread[index]}</h1>
                            <Card cardProfile={card}
                                flipped={true}
                                style={'image'} />
                        </span>
                    ))
                }
            </div>
            <div className='journalInfo'>
                <p className='date'><b>{prettyDateTime()}</b></p>
                <br />
                <ThemeProvider theme={Palette} >
                    <FreeSoloCreateOption />
                    <TextField id="outlined-basic" variant="outlined"
                        placeholder='Journal Entry' multiline={true} minRows={4} />
                </ThemeProvider>
                <br />
                <div className='infoRow'>
                    <button className='action-button'
                        style={{ marginRight: 10 }}>
                        Save
                    </button>
                    <button className='action-button'
                        onClick={() => { cancelNewPage() }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}