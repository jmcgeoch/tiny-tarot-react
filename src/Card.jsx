import './Card.css';
import { cardBack } from './resources/rootIndex';
import CardImages from './resources/cards/cardImageIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

/** 
 * Styles
 * --full: use for full page card descriptions
 * --brief: used for quick shuffle
 * --title: used for laying out lists
*/

export default function Card({ cardProfile, flipped, style = 'brief', close }) {
    const [cardStyle, setCardStyle] = useState(style);

    let name = cardProfile.name;
    let imageName = cardProfile.img;
    let image = CardImages[imageName];
    let keywords = cardProfile.keywords;

    let lightMeanings = cardProfile.meanings.light;
    let shadowMeanings = cardProfile.meanings.shadow;

    if (flipped && style === 'brief') {
        return (
            <div className="Card">
                <h1>{name}</h1>
                <img src={image} />
                <p className='briefKeywords'><b>Keywords:</b> {keywords.join(", ")}</p>
            </div>
        )
    } else if (style === 'title') {
        return (
            <div className="Card">
                <img src={image} className='titleStyleImage' />
            </div>
        )
    } else if (style === 'full') {
        return (
            <div className='Card fullCard'>
                <div className='left'>
                    <div className='infoColumn'>
                        <h1>{name}</h1>
                        <img src={image} className='titleStyleImage' />
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
                            </div>
                            <div className='infoColumn compact'>
                                {
                                    (cardProfile.mythic) ?
                                        <>
                                            <h4>Mythology</h4>
                                            <p className='fact'>{cardProfile.mythic}</p>
                                        </>
                                        :
                                        <></>
                                }
                                <h4>Numerology</h4>
                                <p className='fact'>{cardProfile.numerology}</p>
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
    } else {
        return (
            <div className="Card">
                <h1></h1>
                <img src={cardBack} className='cardBack'/>
                <p></p>
            </div>
        )
    }

}