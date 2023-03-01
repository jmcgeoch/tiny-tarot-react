import './Journal.css';
import Entries from './Entries';
import JournalPage from './JournalPage';
import NewPage from './NewPage';
import ExampleEntries from '../example_journal_entries.json';
import { useState } from 'react';

export default function Journal() {
    const [entries, setEntries] = useState(ExampleEntries);
    const [currentEntry, setCurrentEntry] = useState(ExampleEntries[0]);
    const [loading, setLoading] = useState(false);

    function getEntries() {

        //wrap in useEffect and add loading state + icon
        const fetchedEntries = localStorage.getItem('entries');
        if (fetchedEntries) {
            return fetchedEntries;
        } else {
            return [];
        }
    }

    const openEntry = (entry) => {
        setCurrentEntry(entry);
    }

    return(
        <div className='Journal-body'>
            <Entries entries={entries} openEntry={openEntry}/>
            <JournalPage entry={currentEntry} />
        </div>
    )
}