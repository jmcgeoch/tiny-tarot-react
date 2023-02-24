import './SearchBar.css';

export default function SearchBar({ keyword, onChange }) {

    return (
        <div className='searchBar'>
            <input type='text' placeholder='Search...'
                className='searchInput'
                value={keyword}
                onChange={(e) => {onChange(e.target.value)}} />
        </div>
    );
}