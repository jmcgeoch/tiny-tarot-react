import './Chips.css';

export default function Chips({ tags }) {
    return (
        <div className='chipsContainer'>
            {
                tags.map((tag, index) => (
                    <span className='chip'>
                        {tag}
                    </span>
                ))
            }
        </div>
    )
}