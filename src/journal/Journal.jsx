import './Journal.css';
import Entries from './Entries';
import JournalPage from './JournalPage';
import NewPage from './NewPage';
import ExampleEntries from '../example_journal_entries.json';
import { useState } from 'react';

export default function Journal({ createNewPage = false }) {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newPage, setNewPage] = useState(createNewPage)

    function getEntries() {
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

    const closeNewPage = () => {
        setNewPage(false);
    }

    return(
        <div className='Journal-body'>
            <Entries entries={entries} openEntry={openEntry}/>
            { !newPage && <JournalPage entry={currentEntry} /> }
            { newPage && <NewPage close={closeNewPage} />}
        </div>
    )
}