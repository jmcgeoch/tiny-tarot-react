import './SpreadPicker.css'
import CardSpreadOptions from '../card_spread_options.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function SpreadPicker({ spreadList, save, close }) {
    const [chosenSpread, setChosenSpread] = useState(spreadList);
    const [updated, setUpdated] = useState(false);

    function updateSpread(num, i) {
        if (chosenSpread[num] !== i) {
            let newChosenSpread = [...chosenSpread];
            setUpdated(true)
            newChosenSpread[num] = i;
            setChosenSpread(newChosenSpread);
        }
    }

    function OptionList({ number }) {
        return (
            <div className=''>
                {
                    CardSpreadOptions[number].map((value, index) => (
                        <div className='listRow'>
                            <div className='check'>
                                {
                                    (chosenSpread[number] === index) &&
                                    <FontAwesomeIcon icon={faCheck} />
                                }
                            </div>
                            <button className='listItem action-button'
                                onClick={() => { updateSpread(number, index) }}>
                                {
                                    <span>{value.join(' • ')} </span>
                                }
                            </button>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className='spreadPicker'>
            <div className='container'>
                <div className='options'>
                    <h2>1 Card</h2>
                    <div className='horizDivider'></div>
                    <OptionList number={0} />
                </div>
                <div className='options'>
                    <h2>2 Cards</h2>
                    <div className='horizDivider'></div>
                    <OptionList number={1} />
                </div>
                <div className='options'>
                    <h2>3 Cards</h2>
                    <div className='horizDivider'></div>
                    <OptionList number={2} />
                </div>
            </div>
            <div>
                <button className={`action-button ${!updated ? 'inactive' : ''}`}
                    style={{ marginRight: 10 }}
                    onClick={() => { save(chosenSpread) }}>
                    <b>Save</b>
                </button>
                <button className='action-button'
                    onClick={() => close()}>
                    <b>Cancel</b>
                </button>
            </div>
        </div>
    )
}