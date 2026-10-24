import CharacterCounter from "../CharacterCounter/CharacterCounter";


function StatsDisplay() {


    return (
        <div>
            <h2>Stats Display Component</h2>

            <CharacterCounter />

            <div className="words">
                <p>Words</p>

                <p>0</p>

                <p>Min: 25 | Max: 100</p>
            </div>

            <div className="reading-time">
                <p>Reading Time</p>

                <p>0:00</p>
            </div>
        </div>
    )
}

export default StatsDisplay;