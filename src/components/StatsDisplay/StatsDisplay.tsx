import CharacterCounter from "../CharacterCounter/CharacterCounter";
import './StatsDisplay.css'

function StatsDisplay() {


    return (
        <div className="stats-display">
            <CharacterCounter />

            <div className="stat words">
                <p>Words</p>

                <p>0</p>

                <p>Min: 25 | Max: 100</p>
            </div>

            <div className="stat reading-time">
                <p>Reading Time</p>

                <p>0:00</p>
            </div>
        </div>
    )
}

export default StatsDisplay;