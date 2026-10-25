import type { StatsDisplayProps } from "../../types";


function StatsDisplay({stats, showReadingTime = true}: StatsDisplayProps) {


    return (
        <div className="flex justify-around rounded-lg bg-white p-6">
           <div className="text-center">
                <p className="text-purple-500">Characters</p>
                <p className="text-2xl font-semibold">{stats.characterCount}</p>
            </div>

            <div className="text-center">
                <p className="text-purple-500">Words</p>
                <p className="text-2xl font-semibold">{stats.wordCount}</p>
                <p className="text-red-500 font-medium">Min: 25 | Max: 100</p>
            </div>

            {
            showReadingTime && 
            <div className="text-center">
                <p className="text-purple-500">Reading Time</p>
                <p className="text-2xl font-semibold">{stats.readingTime}</p>
            </div>
            }
        </div>
    )
}

export default StatsDisplay;