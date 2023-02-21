import React from 'react';
import './Search.css';
import CardImages from './resources/cards/cardImageIndex';
import Card from './Card';
import SearchBar from './search/SearchBar';
import TarotLibrary from './tarot_library'
import { useState } from 'react';
import { majorArcana, wands, cups, swords, pentacles } from './resources/icons/iconIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

    function getNextCard({ count }) {
        let cardIndex = parseInt(card.number);
        console.log(cardIndex)
        cardIndex += count;
        if (cardData.length > cardIndex >= 0) {
            setCard(cardData[cardIndex]);
        }
        
    }

    const onOpenDetails = (card) => {
        setCard(card);
        setModalVisible(true);
    };

    const onCloseDetails = () => { setModalVisible(false); };

    function CardContainer() {

        // shows the entire full screen card details
        if (modalVisible) {
            return (
                <div className='modalContainer'>
                    <div>
                        <FontAwesomeIcon icon={faChevronLeft}
                            className='chevron'
                            onClick={() => { getNextCard(-1) }} />
                    </div>
                    <div className='cardsContainer full'>
                    <Card cardProfile={card}
                        flipped={true}
                        style='full'
                        close={onCloseDetails}
                    />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faChevronRight}
                            className='chevron'
                            onClick={() => { getNextCard(1) }} />
                    </div>
                </div>
            )
        } else {

            // shows a list of all the cards for that section
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
                    <img src={majorArcana}
                        className='icon'
                        onClick={() => { setFilter("Major Arcana") }}
                        alt='Major Arcana'
                    />
                    <img src={wands}
                        className='icon'
                        onClick={() => { setFilter("Wands") }}
                        alt='Wands Suit'
                    />
                    <img src={cups}
                        className='icon'
                        onClick={() => { setFilter("Cups") }}
                        alt='Cups Suit'
                    />
                    <img src={swords}
                        className='icon'
                        onClick={() => { setFilter("Swords") }}
                        alt='Swords Suit'
                    />
                    <img src={pentacles}
                        className='icon'
                        onClick={() => { setFilter("Pentacles") }}
                        alt='Pentacles Suit'
                    />
                </div>
                <div className='vertDivider'></div>
                <div className='cardsSearchContainer'>
                    {(!modalVisible) ? <div className='searchHeader'>
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