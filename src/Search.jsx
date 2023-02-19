import './Search.css';
import CardImages from './resources/cards/cardImageIndex';
import Card from './Card';
import SearchBar from './search/SearchBar';
import TarotLibrary from './tarot_library'
import { useState } from 'react';
import { majorArcana, wands, cups, swords, pentacles } from './resources/icons/iconIndex';

export default function Search() {
    const tarotSections = new Map();
    tarotSections.set("majorArcana", TarotLibrary.slice(0, 22));
    tarotSections.set("cups", TarotLibrary.slice(22, 36));
    tarotSections.set("swords", TarotLibrary.slice(36, 50));
    tarotSections.set("wands", TarotLibrary.slice(50, 64));
    tarotSections.set("pentacles", TarotLibrary.slice(64, 78));

    const [currentFilter, setCurrentFilter] = useState("majorArcana");
    const [cardData, setCardData] = useState(tarotSections.get(currentFilter));

    function setFilter(filter) {
        setCurrentFilter(filter);
        setCardData(tarotSections.get(filter));
    }

    function CardContainer() {

        return (
            <div className='cardsContainer'>
                {cardData.map((card, index) => (
                    <Card cardProfile={card} flipped={true} style='title' key={index  + card.name}/>
                ))}
            </div>
        )
    }

    return (
        <>
            <div className='Search-body'>
                <div className='iconNavigation'>
                    <img src={majorArcana} className='icon' onClick={() => { setFilter("majorArcana") }} />
                    <img src={wands} className='icon' onClick={() => { setFilter("wands") }} />
                    <img src={cups} className='icon' onClick={() => { setFilter("cups") }} />
                    <img src={swords} className='icon' onClick={() => { setFilter("swords") }} />
                    <img src={pentacles} className='icon' onClick={() => { setFilter("pentacles") }} />
                </div>
                <div className='vertDivider'></div>
                <div className='cardsSearchContainer'>
                    <SearchBar />
                    <CardContainer />
                </div>
            </div>
        </>
    );
}