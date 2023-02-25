import './Entries.css';
import Card from '../Card';
import TarotLibrary from '../tarot_library.json';

export default function Entries({ entries, openEntry }) {

    function PrettyDateTime({ rawDate }) {
        // const prettyDate = (new Date(rawDate * 1000)).toLocaleDateString();

        return (
            <div className='prettyDate'>
                <b>{rawDate}</b>
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
                    <div className='entry' onClick={() => { openEntry(entry) }}>
                        <PrettyDateTime rawDate={entry.dateTime} />
                        <MiniCards entry={entry} />
                        <div className='divider'></div>
                    </div>
                ))
            }
        </div>
    )
}