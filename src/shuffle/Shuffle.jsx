import './Shuffle.css';
import Card from '../cards/Card';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { file, shuffle } from '../resources/icons/iconIndex';
import TarotLibrary from '../tarot_library'
import CardSpreadOptions from '../card_spread_options'
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';

export default function Shuffle() {
    const [numberOfCards, setNumberOfCards] = useState(3);
    const [isFlipped, setIsFlipped] = useState([false, false, false]);
    const [cards, setCards] = useState(chooseThreeCards);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [frozen, setFrozen] = useState(false);
    const [spreadCategory, setSpreadCategory] = useState(CardSpreadOptions[numberOfCards - 1]);
    const [selectedSpreads, setSelectedSpreads] = useState([0, 0, 0]);
    const navigate = useNavigate()

    let spreadOption = selectedSpreads[numberOfCards - 1];
    const spreadFlip = isFlipped.slice(0, numberOfCards);
    const inactive = spreadFlip.includes(false);

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
        setSpreadCategory(CardSpreadOptions[newSpreadNumber - 1]);
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
            const card = cards[position];
            navigate(`cards/${card.img}`, { state: { card: card } });
        }
        setIsFlipped(newFlippedMap);
    }

    const shuffleCards = () => {
        setIsFlipped([false, false, false]);
        setCards(chooseThreeCards());
        setFrozen(false);
    }

    function onReadingSave() {
        setDialogVisible(false);
        const savedCards = cards.slice(0, numberOfCards);
        const savedSpread = spreadCategory[selectedSpreads[numberOfCards - 1]];
        navigate('/newPage', { state: { cards: savedCards, spread: savedSpread } });
    }

    return (
        <div className="App-body">
            <div className='spreadContainer'>
                <div className='iconNavigation'>
                    <img src={shuffle}
                        className='icon'
                        onClick={() => { shuffleCards() }}
                        alt='Shuffle'
                        title='Shuffle'
                    />
                    <span className={inactive ? `inactiveIcon` : ``}>
                        <img src={file}
                            className='icon'
                            onClick={() => { if (!inactive) setDialogVisible(true) }}
                            alt='Save'
                            title='Save'
                        />
                    </span>
                </div>
                <div className='vertDivider'></div>
                <span style={frozen ? { color: 'gray' } : {}}>
                    <FontAwesomeIcon icon={faChevronLeft}
                        className='chevron'
                        size='xl'
                        onClick={() => { changeNumberOfCards(-1) }} />
                </span>
                {
                    cards.map((card, index) => (
                        (index < numberOfCards) ?
                            <div className='cardContainer' key={card.name + index}>
                                <h1 className='positionName'>
                                    {spreadCategory[spreadOption][index]}
                                </h1>
                                <span onClick={() => { updateFlip(index) }}>
                                    <Card cardProfile={card}
                                        flipped={isFlipped[index]}
                                        style='brief' />
                                </span>
                            </div>
                            :
                            <></>
                    ))
                }
                <span style={frozen ? { color: 'gray' } : {}}>
                    <FontAwesomeIcon icon={faChevronRight}
                        className='chevron'
                        size='xl'
                        onClick={() => { changeNumberOfCards(1) }} />
                </span>
                <Dialog open={dialogVisible}>
                    <div className='dialog'>
                        <p>Do you want to save this reading?</p>
                        <button className='action-button'
                            onClick={() => { onReadingSave() }}
                            style={{ marginRight: 10 }}>
                            Yes
                        </button>
                        <button className='action-button'
                            onClick={() => { setDialogVisible(false) }}>
                            No
                        </button>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}