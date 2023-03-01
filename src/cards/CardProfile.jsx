import './CardProfile.css';
import Card from './Card';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CardProfile() {
    const { state } = useLocation();
    const card = state.card;
    const navigate = useNavigate();

    return (
        <div className='App-body'>
            <div className='cardModal'>
                <Card cardProfile={card}
                    flipped={true}
                    style={'full'}
                    close={() => {navigate(-1)}} />
            </div>
        </div>
    )
}