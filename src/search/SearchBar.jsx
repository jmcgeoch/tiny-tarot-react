import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './SearchBar.css';

export default function SearchBar({ keyword, onChange }) {

    //todo create a clear function

    return (
        <div className='searchBar'>
            <input type='text' placeholder='Search...'
                className='searchInput'
                value={keyword}
                onChange={(e) => { onChange(e.target.value) }} />
            <span className='closeIcon' onClick={() => { onChange('') }}>
                <FontAwesomeIcon icon={faXmark} size={'lg'}/>
            </span>
        </div>
    );
}