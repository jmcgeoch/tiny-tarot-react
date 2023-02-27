import './Shuffle.css';
import Card from '../Card.jsx';
import SpreadPicker from './SpreadPicker';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { file, shuffle, settings } from '../resources/icons/iconIndex';
import TarotLibrary from '../tarot_library'
import CardSpreadOptions from '../card_spread_options'
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';

export default function Shuffle() {
    const [numberOfCards, setNumberOfCards] = useState(3);
    const [isFlipped, setIsFlipped] = useState([false, false, false]);
    const [cards, setCards] = useState(chooseThreeCards);
    const [cardStyle, setCardStyle] = useState('brief')
    const [modalVisible, setModalVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [frozen, setFrozen] = useState(false);
    const [currentSpread, setCurrentSpread] = useState(CardSpreadOptions[numberOfCards - 1]);
    const [selectedSpreads, setSelectedSpreads] = useState([0, 0, 0]);
    const [editSpread, setEditSpread] = useState(false);

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
        setCurrentSpread(CardSpreadOptions[newSpreadNumber - 1]);
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

    const shuffleCards = () => {
        setIsFlipped([false, false, false]);
        setCards(chooseThreeCards());
        setFrozen(false);
        setEditSpread(false);
        setModalVisible(false);
    }

    const onCloseDetails = () => {
        setCardStyle('brief');
        setModalVisible(false);
    };

    const navigate = useNavigate()

    function onSave(spreadList) {
        setSelectedSpreads(spreadList);
        setEditSpread(false);
    }

    function onReadingSave() {
        setDialogVisible(false);
        navigate('/journal');
    }

    function ShuffleContainer() {
        if (editSpread) {
            return (
                <SpreadPicker spreadList={selectedSpreads} save={onSave} />
            )
        } else {
            return (
                <>
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
                </>
            )
        }
    }

    function ShuffleSpread() {
        let spreadOption = selectedSpreads[numberOfCards - 1];

        return (
            <div className='spreadContainer'>
                {cards.map((card, index) => (
                    (index < numberOfCards) ?
                        <span className='cardContainer'>
                            <h1 className='positionName'>{currentSpread[spreadOption][index]}</h1>
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

    //fix this state issue
    function SaveIcon({ flipped }) {
        const spreadFlip = flipped.slice(0, numberOfCards - 1);

        if (spreadFlip.includes(false)) {
            return (
                <img src={file}
                    className='icon inactiveIcon'
                    alt='Save'
                    title='Save'
                />
            )
        } else {
            return (
                <img src={file}
                    className='icon'
                    onClick={() => { setDialogVisible(true) }}
                    alt='Save'
                    title='Save'
                />
            )
        }
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
                        <div className='iconNavigation'>
                            <img src={shuffle}
                                className='icon'
                                onClick={() => { shuffleCards() }}
                                alt='Shuffle'
                                title='Shuffle'
                            />
                            <SaveIcon flipped={isFlipped}/>
                            <img src={settings}
                                className='icon'
                                onClick={() => { setEditSpread(true) }}
                                alt='Settings'
                                title='Settings'
                            />
                        </div>
                        <div className='vertDivider'></div>
                        <ShuffleContainer />
                        <Dialog open={dialogVisible}>
                            <div className='dialog'>
                                <p>Do you want to save this reading?</p>
                                <button onClick={() => { onReadingSave() }}
                                style={{marginRight: 10}}>
                                    Yes
                                </button>
                                <button onClick={() => {setDialogVisible(false)}}>
                                    No
                                </button>
                            </div>
                        </Dialog>
                    </div>
            }
        </div>
    );
}