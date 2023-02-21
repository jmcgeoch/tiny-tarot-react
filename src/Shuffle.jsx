import './Shuffle.css';
import Card from './Card.jsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import TarotLibrary from './tarot_library'
import CardSpreadOptions from './card_spread_options.json'

export default function Shuffle() {
    const [numberOfCards, setNumberOfCards] = useState(3);
    const [isFlipped, setIsFlipped] = useState([false, false, false]);
    const [cards] = useState(chooseThreeCards);
    const [cardStyle, setCardStyle] = useState('brief')
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [frozen, setFrozen] = useState(false);
    const [cardTitles, setCardTitles] = useState(CardSpreadOptions[numberOfCards - 1]);

    console.log(cardTitles);

    function chooseThreeCards() {
        let counter = 0;
        let newCards = [];
        let tempArray = [];

        while (counter < 3) {
            let cardNumberChosen = Math.floor(Math.random() * 77);

            if (!tempArray.includes(cardNumberChosen)) {
                tempArray.push(cardNumberChosen)
                newCards.push(TarotLibrary[cardNumberChosen]);
                counter++;
            }
        }
        return newCards;
    }

    function changeNumberOfCards(clicks) {
        if (frozen) { return; }
        let newSpreadNumber = (clicks + numberOfCards) % 3;
        if (newSpreadNumber === 0) newSpreadNumber = 3;

        setNumberOfCards(newSpreadNumber);
        setCardTitles(CardSpreadOptions[newSpreadNumber - 1]);
    }

    function updateFlip(position) {
        const newFlippedMap = isFlipped.map((f, i) => {
            if (i === position) {
                setFrozen(true);
                return true;
            } else {
                return f;
            }
        });

        // checks if this card is already flipped
        if (isFlipped[position] === true) {
            setSelectedCard(cards[position]);
            setModalVisible(true);
            setCardStyle('full');
        }
        setIsFlipped(newFlippedMap);
    }

    const onCloseDetails = () => {
        setCardStyle('brief');
        setModalVisible(false);
    };

    function ShuffleSpread() {
        return (
            <div className='spreadContainer'>
                {cards.map((card, index) => (
                    (index < numberOfCards) ?
                        <span className='cardContainer'>
                            <h1 className='positionName'>{cardTitles[0][index]}</h1>
                            <span onClick={() => { updateFlip(index) }}>
                                <Card cardProfile={card} flipped={isFlipped[index]} style={cardStyle} />
                            </span>
                        </span>
                        :
                        <></>
                ))}
            </div>
        )
    }

    return (
        <div className="App-body">
            {
                (modalVisible) ?
                    <div className='cardModal'>
                        <Card cardProfile={selectedCard}
                            flipped={true}
                            style={'full'}
                            close={onCloseDetails} />
                    </div> :
                    <div className='spreadContainer'>
                        <span style={frozen ? { color: 'gray' } : {}}>
                            <FontAwesomeIcon icon={faChevronLeft}
                                className='chevron'
                                onClick={() => { changeNumberOfCards(-1) }} />
                        </span>
                        <ShuffleSpread />
                        <span style={frozen ? { color: 'gray' } : {}}>
                            <FontAwesomeIcon icon={faChevronRight}
                                className='chevron'
                                onClick={() => { changeNumberOfCards(1) }} />
                        </span>
                    </div>
            }
        </div>
    );
}