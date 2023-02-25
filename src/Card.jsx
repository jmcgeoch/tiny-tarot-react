import './Card.css';
import CardImages from './resources/cards/cardImageIndex';
import { cardBack } from './resources/rootIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/** 
 * Styles
 * --full: use for full page card descriptions
 * --brief: used for quick shuffle
 * --title: used for laying out lists
*/

export default function Card({ cardProfile, flipped, style = 'brief', close }) {
    let name = cardProfile.name;
    let imageName = cardProfile.img;
    let image = CardImages[imageName];
    let keywords = cardProfile.keywords;

    let lightMeanings = cardProfile.meanings.light;
    let shadowMeanings = cardProfile.meanings.shadow;

    function CardImage() {
        return (
            <div className="Card">
                <img src={image} className='cardImage' alt={name} title={name} />
            </div>
        )
    }

    function KeywordCard() {
        return (
            <div className="Card">
                <h1>{name}</h1>
                <img src={image} alt={name} title={name} />
                <p className='briefKeywords'><b>Keywords:</b> {keywords.join(", ")}</p>
            </div>
        )
    }

    function FullCard() {
        return (
            <div className='Card fullCard'>
                <div className='left'>
                    <div className='infoColumn'>
                        <h1>{name}</h1>
                        <img src={image} className='cardImage' alt={name} title={name} />
                        {
                            (cardProfile.archetype) ?
                                <p className='archetype'><i>{cardProfile.archetype}</i></p> :
                                <p className='archetype'><i>{cardProfile.affirmation}</i></p>
                        }
                    </div>
                </div>
                <div className='cardBody'>
                    <div className='fullCardHeader'>
                        <span className='headerKeywords'><h2>{keywords.join(' • ')}</h2></span>
                        <div onClick={() => { close() }}><FontAwesomeIcon icon={faXmark} size={'xl'} /></div>
                    </div>
                    <div className='infoColumn'>
                        <div className='infoColumn meaningsContainer'>
                            <div className='infoRow fullCard shrink'>
                                <span className='fact'><h4>Number</h4><p>{cardProfile.number}</p></span>
                                <span className='fact'><h4>Element</h4><p>{cardProfile.elemental}</p></span>
                                <span className='fact'><h4>Astrology</h4><p>{cardProfile.astrology}</p></span>
                                { (cardProfile.hebrew) && <span className='fact'><h4>Hebrew</h4><p>{cardProfile.hebrew}</p></span> }
                            </div>
                            <div className='infoColumn compact'>
                                {
                                    (cardProfile.mythic) &&
                                    <>
                                        <h4>Mythology</h4>
                                        <p className='fact'>{cardProfile.mythic}</p>
                                    </>
                                }
                                {
                                    (cardProfile.numerology) &&
                                    <>
                                        <h4>Numerology</h4>
                                        <p className='fact'>{cardProfile.numerology}</p>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='infoRow'>
                            <div className='infoColumn'>
                                <h4>Light Meanings</h4>
                                <div className='meaningsContainer'>
                                    {
                                        lightMeanings.map((meaning, index) => (
                                            <li>{meaning}</li>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='infoColumn'>
                                <h4>Shadow Meanings</h4>
                                <div className='meaningsContainer'>
                                    {
                                        shadowMeanings.map((meaning, index) => (
                                            <li>{meaning}</li>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (flipped && style === 'brief') {
        return <KeywordCard />
    } else if (style === 'title') {
        return <CardImage />
    } else if (style === 'full') {
        return <FullCard />
    } else {
        return (
            <div className="Card">
                <img src={cardBack} className='cardBack' alt='card' />
            </div>
        )
    }
}