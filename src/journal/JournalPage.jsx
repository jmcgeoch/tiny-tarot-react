import './JournalPage.css';
import Card from '../cards/Card';
import Chip from '@mui/material/Chip';
import { ThemeProvider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Palette from '../resources/MuiPalette.tsx'
import TarotLibrary from '../tarot_library.json';
import { parseEntryDate } from '../utilities/DateUtil.ts';

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
                                    <h2 className='positionName'>{entry.cardPositions[index]}</h2>
                                    <span onClick={() => { }}>
                                        <Card cardProfile={TarotLibrary[card]}
                                            flipped={true}
                                            style={'keyword'}
                                        />
                                    </span>
                                </span>
                            ))
                        }
                        <div className='journalInfo'>
                            <p className='date'><b>{parseEntryDate(entry.dateTime)}</b></p>
                            <br />
                            <span className='chips'>
                                <ThemeProvider theme={Palette} >
                                    {
                                        entry.tags &&
                                        entry.tags.map((tag, index) => (
                                            <Chip label={tag}
                                                sx={{
                                                    marginRight: 1,
                                                    marginBottom: 2,
                                                    color: 'text.primary',
                                                    bgcolor: 'white',
                                                    border: 1,
                                                    borderColor: 'primary.main'
                                                }}
                                                size={'small'} key={tag + index} />
                                        ))

                                    }
                                </ThemeProvider>
                            </span>
                            {
                                entry.userEntry &&
                                <p style={{ height: '50%' }}>{entry.userEntry}</p>
                            }
                        </div>

                    </div>

                </>
            }
        </div>
    )
}