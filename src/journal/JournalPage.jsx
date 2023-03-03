import './JournalPage.css';
import Card from '../cards/Card';
import Chips from './Chips';
import { NavLink } from 'react-router-dom';
import TarotLibrary from '../tarot_library.json';

function NoEntriesPage() {
    return (
        <div className='noEntries'>
            <h2>Uh-oh! Looks like there's no entries here...</h2>
            <br />
            <NavLink to='/' className='shuffleLink'>
                <button className='action-button'>
                    Shuffle?
                </button>
            </NavLink>
            <NavLink to='/' className='shuffleLink'>
                <button className='action-button'>
                    Login
                </button>
            </NavLink>
        </div>
    )
}

export default function JournalPage({ entry }) {

    return (
        <div className='page'>
            {!entry && <NoEntriesPage />}
            {
                entry &&
                <>
                    <div className='journalSpreadContainer'>
                        {
                            entry.cards.map((card, index) => (
                                <span className='entryCard' key={card.name + index}>
                                    <h1 className='positionName'>{entry.cardPositions[index]}</h1>
                                    <span onClick={() => { }}>
                                        <Card cardProfile={TarotLibrary[card]}
                                            flipped={true}
                                            style={'brief'}
                                        />
                                    </span>
                                </span>
                            ))
                        }
                        <div className='journalInfo'>
                            <p className='date'><b>{entry.dateTime}</b></p>
                            <br />
                            {
                                entry.tags &&
                                <span className='chips'><Chips tags={entry.tags} /></span>
                            }
                            {
                                entry.userEntry &&
                                <p>{entry.userEntry}</p>
                            }
                        </div>
                        
                    </div>

                </>
            }
        </div>
    )
}