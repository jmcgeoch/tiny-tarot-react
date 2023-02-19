import './Card.css';
import { cardBack } from './resources/rootIndex';
import CardImages from './resources/cards/cardImageIndex';

export default function Card({ cardProfile, flipped }) {
    let name = cardProfile.name;
    let imageName = cardProfile.img;
    let image = CardImages[imageName];
    let keywords = cardProfile.keywords.join(", ");

    if (flipped) {
        return (
            <div className="Card">
                <h1>{name}</h1>
                <img src={image} />
                <p><b>Keywords:</b> {keywords}</p>
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