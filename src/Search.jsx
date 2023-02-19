import './Search.css';
import SearchBar from './search/SearchBar';
import SuitFilter from './search/SuitFilter';

function CardContainer() {
    return(
        <div>

        </div>
    )
}

export default function Search() {
    return (
        <>
            <div className='App-body'>
                <SuitFilter />
                <div className='vertDivider'></div>
                <SearchBar />
            </div>
        </>
    );
}