import './Card.css';
import CardImages from '../resources/cards/cardImageIndex.tsx';
import { cardBack } from '../resources/rootIndex.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/** 
 * Styles
 * --full: use for full page card descriptions
 * --keyword: used for quick shuffle with keywords
 * --image: used for laying out lists
*/

export default function Card({ cardProfile, flipped, style = 'keyword', close }) {

    if (flipped && style === 'keyword') {
        return <KeywordCard card={cardProfile} />
    } else if (style === 'image') {
        return <CardImage card={cardProfile} />
    } else if (style === 'full') {
        return <FullCard card={cardProfile} close={close} />
    } else if (style === 'small') {
        return (
            <div className='smallCardContainer'>
                <img src={CardImages[cardProfile.img]}
                    className='small'
                    alt={cardProfile.name}
                    title={cardProfile.name} />
            </div>
        )
    } else {
        return (
            <div className="Card">
                <img src={cardBack} className='cardBack' alt='card' />
            </div>
        )
    }
}

function CardImage({ card }) {
    return (
        <div className="Card">
            <img src={CardImages[card.img]} className='cardImage' alt={card.name} title={card.name} />
        </div>
    )
}

function KeywordCard({ card }) {
    return (
        <div className="Card">
            <h2>{card.name}</h2>
            <img src={CardImages[card.img]} alt={card.name} title={card.name} />
            <p className='briefKeywords'><b>Keywords:</b> {card.keywords.join(", ")}</p>
        </div>
    )
}

function FullCard({ card, close }) {
    let lightMeanings = card.meanings.light;
    let shadowMeanings = card.meanings.shadow;

    return (
        <div className='Card fullCard'>
            <div className='left'>
                <div className='infoColumn'>
                    <h1>{card.name}</h1>
                    <img src={CardImages[card.img]} className='cardImage' alt={card.name} title={card.name} />
                    {
                        (card.archetype) ?
                            <p className='archetype'><i>{card.archetype}</i></p> :
                            <p className='archetype'><i>{card.affirmation}</i></p>
                    }
                </div>
            </div>
            <div className='cardBody'>
                <div className='fullCardHeader'>
                    <span className='headerKeywords'><h2>{card.keywords.join(' • ')}</h2></span>
                    <div onClick={() => { close() }}><FontAwesomeIcon icon={faXmark} size={'xl'} /></div>
                </div>
                <div className='infoColumn'>
                    <div className='infoColumn meaningsContainer'>
                        <div className='infoRow fullCard shrink'>
                            <span className='fact'><h4>Number</h4><p>{card.number}</p></span>
                            <span className='fact'><h4>Element</h4><p>{card.elemental}</p></span>
                            <span className='fact'><h4>Astrology</h4><p>{card.astrology}</p></span>
                            {(card.hebrew) && <span className='fact'><h4>Hebrew</h4><p>{card.hebrew}</p></span>}
                        </div>
                        <div className='infoColumn compact'>
                            {
                                (card.mythic) &&
                                <>
                                    <h4>Mythology</h4>
                                    <p className='fact'>{card.mythic}</p>
                                </>
                            }
                            {
                                (card.numerology) &&
                                <>
                                    <h4>Numerology</h4>
                                    <p className='fact'>{card.numerology}</p>
                                </>
                            }
                            {
                                (card.court) &&
                                <>
                                    <h4>Court Card</h4>
                                    <p className='fact'>{card.court}</p>
                                </>
                            }
                        </div>
                    </div>
                    <div className='infoRow'>
                        <div className='infoColumn'>
                            <h4>Light Meanings</h4>
                            <div className='meaningsContainer'>
                                <ul>
                                    {
                                        lightMeanings.map((meaning, index) => (
                                            <li>{meaning}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='infoColumn'>
                            <h4>Shadow Meanings</h4>
                            <div className='meaningsContainer'>
                                <ul>
                                    {
                                        shadowMeanings.map((meaning, index) => (
                                            <li>{meaning}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}