import React from 'react';
import './Search.css';
import Card from './Card';
import SearchBar from './search/SearchBar';
import TarotLibrary from './tarot_library'
import { useState } from 'react';
import { majorArcana, wands, cups, swords, pentacles, search } from './resources/icons/iconIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
    const tarotSections = new Map();
    tarotSections.set("Major Arcana", TarotLibrary.slice(0, 22));
    tarotSections.set("Cups", TarotLibrary.slice(22, 36));
    tarotSections.set("Swords", TarotLibrary.slice(36, 50));
    tarotSections.set("Wands", TarotLibrary.slice(50, 64));
    tarotSections.set("Pentacles", TarotLibrary.slice(64, 78));

    const [currentFilter, setCurrentFilter] = useState('');
    const [cardData, setCardData] = useState(TarotLibrary);
    const [modalVisible, setModalVisible] = useState(false);
    const [card, setCard] = useState({});
    const [keyword, setKeyword] = useState('');
    const [showSearch, setShowSearch] = useState(true);

    function setFilter(filter) {
        setCurrentFilter(filter);
        setShowSearch(false);
        setKeyword('');
        setCardData(tarotSections.get(filter));
        if (modalVisible) onCloseDetails();
    }

    //todo fix this function
    function getNextCard({ count }) {
        let cardIndex = parseInt(card.number);

        cardIndex += count;
        if (cardData.length > cardIndex >= 0) {
            setCard(cardData[cardIndex]);
        }

    }

    const onOpenDetails = (card) => {
        setCard(card);
        setModalVisible(true);
    };

    const onCloseDetails = () => { 
        setModalVisible(false); 
    };

    const onSearchClick = () => {
        setShowSearch(true);
        setCardData(TarotLibrary);
    };

    const updateKeyword = (keyword) => {
        const filtered = TarotLibrary.filter(card => {
            let keywordString = (card.name + ' ' + card.elemental + ' ' + card.astrology + ' ' + card.keywords.join(' ')).toLowerCase();
            let numberMatch = parseInt(card.number) === parseInt(keyword);
            let nameMatch = keywordString.includes(keyword.toLowerCase()) ;
            
            return numberMatch || nameMatch;
        })
        setKeyword(keyword);
        (keyword === '') ? setCardData(TarotLibrary) : setCardData(filtered);
    };

    function CardContainer({ cards }) {

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
                    {cards.map((card, index) => (
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
                <>
                    {
                        (!modalVisible) ?
                            <>
                                <div className='iconNavigation'>
                                    <img src={search}
                                        className='icon'
                                        onClick={() => { onSearchClick() }}
                                        alt='Search'
                                        title='Search'
                                    />
                                    <img src={majorArcana}
                                        className='icon'
                                        onClick={() => { setFilter("Major Arcana") }}
                                        alt='Major Arcana'
                                        title='Major Arcana'
                                    />
                                    <img src={cups}
                                        className='icon'
                                        onClick={() => { setFilter("Cups") }}
                                        alt='Cups Suit'
                                        title='Cups Suit'
                                    />
                                    <img src={swords}
                                        className='icon'
                                        onClick={() => { setFilter("Swords") }}
                                        alt='Swords Suit'
                                        title='Swords Suit'
                                    />
                                    <img src={wands}
                                        className='icon'
                                        onClick={() => { setFilter("Wands") }}
                                        alt='Wands Suit'
                                        title='Wands Suit'
                                    />
                                    <img src={pentacles}
                                        className='icon'
                                        onClick={() => { setFilter("Pentacles") }}
                                        alt='Pentacles Suit'
                                        title='Pentacles Suit'
                                    />
                                </div>
                                <div className='vertDivider'></div>
                            </>
                            :
                            ''
                    }
                </>
                <div className='cardsSearchContainer'>
                    {
                        (!modalVisible) ?
                            <div className='searchHeader'>
                                {
                                    !showSearch &&
                                    <h1 className='filterName'>
                                        {currentFilter}
                                    </h1>
                                }
                                {
                                    showSearch &&
                                    <SearchBar keyword={keyword} onChange={updateKeyword} />
                                }
                            </div> :
                            ''
                    }
                    <CardContainer cards={cardData} />
                </div>
            </div>
        </>
    );
}