import './SearchBar.css';

export default function SearchBar() {
    return(
        <div className='searchBar'>
            <input type='text' placeholder='Search...' 
            className='searchInput'/>
        </div>
    );
}