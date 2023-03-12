import './NewPage.css';
import Palette from '../resources/MuiPalette.tsx';
import { ThemeProvider } from '@mui/material';
import Card from '../cards/Card';
import ChipInput from './ChipInput';
import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { prettyDateTimeNow } from '../utilities/DateUtil.ts';

export default function NewPage() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const newEntryCards = state.cards;
    const spreadPositions = state.spread;
    let jsonJournalEntry = {
        id: null,
        dateTime: '',
        cards: [],
        cardPositions: [],
        tags: [],
        userEntry: ''
    };

    function cancelNewPage() {
        navigate(-1);
    }

    return (
        <div className='App-body'>
            <h1 className='new-entry-title'>New Journal Entry</h1>
            <div className='infoRow'>
            <div className='spreadContainer' >
                {
                    newEntryCards.map((card, index) => (
                        <div className='new-entry cardContainer' key={card.name + index}>
                            <h1 className='new-entry positionName'>{spreadPositions[index]}</h1>
                            <Card cardProfile={card}
                                flipped={true}
                                style={'keyword'} />
                        </div>
                    ))
                }
            </div>
            <div className='journal-info' style={{ justifyContent: 'space-evenly'}}>
                <p className='date'><b>{prettyDateTimeNow()}</b></p>
                <br />
                <ThemeProvider theme={Palette} >
                    <ChipInput />
                    <br />
                    <TextField id="outlined-basic"
                        variant="outlined"
                        placeholder='Journal Entry'
                        fullWidth={true}
                        multiline={true}
                        minRows={5}
                        maxRows={10} />
                </ThemeProvider>
                <br />
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