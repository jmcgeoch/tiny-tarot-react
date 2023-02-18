import './Card.css';
import cardDescriptions from './tarot_library.json';

export default function Card({ cardNumber, flipped }) {
    let keywords = cardDescriptions[cardNumber].keywords.join(", ");

    if(flipped) {
        return (
            <div className="Card">
                <h1>{cardDescriptions[cardNumber].name}</h1>
                <img src={require('./resources/cards/' + cardDescriptions[cardNumber].img)} />
                <p><b>Keywords:</b> {keywords}</p>
            </div>
        )
    } else {
        return (
            <div className="Card">
                <h1></h1>
                <img src={require('./resources/card_back.jpg')} />
                <p></p>
            </div>
        )
    }
    
}