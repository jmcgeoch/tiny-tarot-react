import './SuitFilter.css';
import { majorArcana, wands, cups, swords, pentacles } from '../resources/icons/iconIndex';

export default function SuitFilter() {

    return(
        <div className='iconNavigation'>
            <img src={majorArcana} className='icon'/>
            <img src={wands} className='icon'/>
            <img src={cups} className='icon'/>
            <img src={swords} className='icon'/>
            <img src={pentacles} className='icon'/>
        </div>
    )
}