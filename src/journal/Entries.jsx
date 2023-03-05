import './Entries.css';
import Card from '../cards/Card';
import TarotLibrary from '../tarot_library.json';
import { parseEntryDate } from './DateUtility.ts';

export default function Entries({ entries, openEntry }) {

    function selectEntry(entry) {
        openEntry(entry);
        //conditionally set some css to show selected
    }

    return (
        <div className='entriesContainer'>
            {
                (entries.length === 0) &&
                <div className='noEntries'>
                    <p>
                        No Entries
                    </p>
                </div>
            }
            {
                entries.map((entry, index) => (
                    <div className='entry' onClick={() => { selectEntry(entry) }}>
                        <div className='prettyDate'>
                            <b>{parseEntryDate(entry.dateTime)}</b>
                        </div>
                        <MiniCards entry={entry} />
                    </div>
                ))
            }
        </div>
    )
}


function MiniCards({ entry }) {

    return (
        <div className='cards'>
            {
                entry.cards.map((card, index) => (
                    <Card cardProfile={TarotLibrary[card]}
                        flipped={true}
                        style={'small'} />
                ))
            }
        </div>
    )
}