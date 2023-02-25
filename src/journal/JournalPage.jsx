import './JournalPage.css';
import Card from '../Card';
import Chips from './Chips';
import { NavLink } from 'react-router-dom';
import TarotLibrary from '../tarot_library.json';

export default function JournalPage({ entry }) {

    function NoEntriesPage() {
        return (
            <div className='noEntries'>
                <h2>Uh-oh! Looks like there's no entries here...</h2>
                <br />
                <NavLink to='/' className='shuffleLink'>
                    <button>
                        Shuffle?
                    </button>
                </NavLink>
                <NavLink to='/' className='shuffleLink'>
                    <button>
                        Login
                    </button>
                </NavLink>
            </div>
        )
    }

    return (
        <div className='page'>
            {!entry && <NoEntriesPage />}
            {
                entry &&
                <>
                    <p className='date'><b>{entry.dateTime}</b></p>
                    <div className='spreadContainer'>
                        {
                            entry.cards.map((card, index) => (
                                <span className='entryCard'>
                                    <h1 className='positionName'>{entry.cardPositions[index]}</h1>
                                    <span onClick={() => { }}>
                                        <Card cardProfile={TarotLibrary[card]} 
                                        flipped={true} 
                                        style={'image'} 
                                        />
                                    </span>
                                </span>
                            ))
                        }
                    </div>
                    {
                        entry.tags &&
                        <Chips tags={entry.tags} />
                    }
                    {
                        entry.userEntry &&
                        <p>{entry.userEntry}</p>
                    }
                </>
            }
        </div>
    )
}