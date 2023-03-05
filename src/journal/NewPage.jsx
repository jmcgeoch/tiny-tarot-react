import './NewPage.css';
import Palette from '../resources/MuiPalette.tsx';
import { ThemeProvider } from '@mui/material';
import Card from '../cards/Card';
import ChipInput from './ChipInput';
import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import prettyDateTimeNow from './DateUtility.ts';

export default function NewPage() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const journalCards = state.cards;
    const journalSpread = state.spread;
    let jsonJournalEntry = {};

    function cancelNewPage() {
        navigate(-1);
    }

    return (
        <div className='App-body'>
            <h1 style={{ marginTop: '20px' }}>New Journal Entry</h1>
            <div className='infoRow'>
            <div className='spreadContainer' style={{ maxHeight: 'none', width: 'max-content' }}>
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
            <div className='journalInfo' style={{ justifyContent: 'space-evenly'}}>
                <p className='date'><b>{prettyDateTimeNow()}</b></p>
                <br />
                <ThemeProvider theme={Palette} >
                    <ChipInput />
                    <br />
                    <TextField id="outlined-basic"
                        variant="outlined"
                        placeholder='Journal Entry'
                        multiline={true}
                        minRows={5} />
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
        </div>
    )
}