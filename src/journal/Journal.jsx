import './Journal.css';
import Entries from './Entries'
import JournalPage from './JournalPage'
import ExampleEntries from '../example_journal_entries.json'
import { useState } from 'react'

export default function Journal() {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState(ExampleEntries[0]);

    const openEntry = (entry) => {
        setCurrentEntry(entry);
        console.log(entry)
    }

    return(
        <div className='Journal-body'>
            <Entries entries={ExampleEntries} openEntry={openEntry}/>
            <JournalPage entry={currentEntry} />
        </div>
    )
}