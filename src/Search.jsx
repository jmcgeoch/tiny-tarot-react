import React from 'react';
import './Search.css';
import CardImages from './resources/cards/cardImageIndex';
import Card from './Card';
import SearchBar from './search/SearchBar';
import TarotLibrary from './tarot_library'
import { useState } from 'react';
import { majorArcana, wands, cups, swords, pentacles } from './resources/icons/iconIndex';

export default function Search() {
    const tarotSections = new Map();
    tarotSections.set("Major Arcana", TarotLibrary.slice(0, 22));
    tarotSections.set("Cups", TarotLibrary.slice(22, 36));
    tarotSections.set("Swords", TarotLibrary.slice(36, 50));
    tarotSections.set("Wands", TarotLibrary.slice(50, 64));
    tarotSections.set("Pentacles", TarotLibrary.slice(64, 78));

    const [currentFilter, setCurrentFilter] = useState("Major Arcana");
    const [cardData, setCardData] = useState(tarotSections.get(currentFilter));
    const [modalVisible, setModalVisible] = useState(false);
    const [card, setCard] = useState({});

    function setFilter(filter) {
        setCurrentFilter(filter);
        setCardData(tarotSections.get(filter));
        if (modalVisible) onCloseDetails();
    }

    const onOpenDetails = (card) => {
        setCard(card);
        setModalVisible(true);
    };

    const onCloseDetails = () => { setModalVisible(false); };

    function CardContainer() {
        if (modalVisible) {
            return (
                <div className='cardsContainer full'>
                    <Card cardProfile={card}
                        flipped={true}
                        style='full'
                        close={onCloseDetails}
                    />
                </div>
            )
        } else {
            return (
                <div className='cardsContainer'>
                    {cardData.map((card, index) => (
                        <div className='cardWrapper' onClick={() => { onOpenDetails(card) }}>
                            <Card cardProfile={card}
                                flipped={true}
                                style='title'
                                key={index + card.name}
                            />
                        </div>
                    ))}
                </div>
            )
        }
    }

    return (
        <>
            <div className='Search-body'>
                <div className='iconNavigation'>
                    <img src={majorArcana} className='icon' onClick={() => { setFilter("Major Arcana") }} />
                    <img src={wands} className='icon' onClick={() => { setFilter("Wands") }} />
                    <img src={cups} className='icon' onClick={() => { setFilter("Cups") }} />
                    <img src={swords} className='icon' onClick={() => { setFilter("Swords") }} />
                    <img src={pentacles} className='icon' onClick={() => { setFilter("Pentacles") }} />
                </div>
                <div className='vertDivider'></div>
                <div className='cardsSearchContainer'>
                    {(!modalVisible)  ? <div className='searchHeader'>
                        <h1 className='cardTitle'>
                            {currentFilter}
                        </h1>
                        <SearchBar />
                    </div> : ''}
                    <CardContainer />
                </div>
            </div>
        </>
    );
}