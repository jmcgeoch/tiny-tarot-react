import './Card.css';
import { cardBack } from './resources/rootIndex';
import CardImages from './resources/cards/cardImageIndex';

/** 
 * Styles
 * --full
 * --brief
 * --title
*/

export default function Card({ cardProfile, flipped, style = 'brief' }) {
    let name = cardProfile.name;
    let imageName = cardProfile.img;
    let image = CardImages[imageName];
    let keywords = cardProfile.keywords.join(", ");

    if (flipped && style === 'brief') {
        return (
            <div className="Card">
                <h1>{name}</h1>
                <img src={image} />
                <p><b>Keywords:</b> {keywords}</p>
            </div>
        )
    } else if (style === 'title')  {
        return (
            <div className="Card">
                <img src={image} className='titleStyleImage'/>
            </div>
        )
    } else {
        return (
            <div className="Card">
                <h1></h1>
                <img src={cardBack} />
                <p></p>
            </div>
        )
    }
    
}