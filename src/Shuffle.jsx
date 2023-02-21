import './Shuffle.css';
import Card from './Card.jsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import TarotLibrary from './tarot_library'

export default function Shuffle() {
    const [numberOfCards, setNumberOfCards] = useState(3);
    const [cards] = useState(chooseThreeCards);
    const [isFlipped, setIsFlipped] = useState([false, false, false]);
    const [cardStyle, setCardStyle] = useState('brief')
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

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

    // fix this section
    function changeNumberOfCards(clicks) {
        console.log('clicks: ' + clicks, 'number cards: ' + numberOfCards);
        let newSpreadNumber = clicks + numberOfCards;
        if (newSpreadNumber < 1 || newSpreadNumber > 3) {
            newSpreadNumber = (newSpreadNumber % 3);
        }
        console.log('number cards: ' + newSpreadNumber);
        setNumberOfCards(newSpreadNumber);
    }

    function updateFlip(position) {
        const newFlippedMap = isFlipped.map((f, i) => {
            if (i === position) {
                return true;
            } else {
                return f;
            }
        });

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


    function generateCards(numberOfCards) {

        return (
        <>
        </>
        )
    }

    function ShuffleSpread() {
        return(
            <>
            <FontAwesomeIcon icon={faChevronLeft}
                className='chevron'
                onClick={() => { changeNumberOfCards(-1) }} />
            <span className='cardContainer' onClick={() => { updateFlip(0) }}>
                <Card cardProfile={cards[0]} flipped={isFlipped[0]} style={cardStyle} />
            </span>
            <span className='cardContainer' onClick={() => { updateFlip(1) }}>
                <Card cardProfile={cards[1]} flipped={isFlipped[1]} style={cardStyle}/>
            </span>
            <span className='cardContainer' onClick={() => { updateFlip(2) }}>
                <Card cardProfile={cards[2]} flipped={isFlipped[2]} style={cardStyle}/>
            </span>
            <FontAwesomeIcon icon={faChevronRight}
                className='chevron'
                onClick={() => { changeNumberOfCards(1) }} />
            </>
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
                    close={onCloseDetails}/>
                    </div> :
                <ShuffleSpread />
            }
        </div>
    );
}