import type { StatsDisplayProps } from "../../types";


function StatsDisplay({stats, showReadingTime = true}: StatsDisplayProps) {


    return (
        <div className="stats-display">
           <div className="">
                <p>Characters</p>
                <p>{stats.characterCount}</p>
            </div>

            <div className="stat words">
                <p>Words</p>
                <p>{stats.wordCount}</p>
                <p>Min: 25 | Max: 100</p>
            </div>

            {
            showReadingTime && 
            <div className="stat reading-time">
                <p>Reading Time</p>
                <p>{stats.readingTime}</p>
            </div>
            }
        </div>
    )
}

export default StatsDisplay;