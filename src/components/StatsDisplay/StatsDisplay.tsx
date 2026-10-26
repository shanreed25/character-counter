import type { StatsDisplayProps } from "../../types";


function StatsDisplay({stats, showReadingTime = true, minWords, maxWords}: StatsDisplayProps) {


    function getColor(): string{
        if (minWords === undefined || maxWords === undefined){
            return ""
        }

        switch(true){
            case stats.wordCount < minWords || stats.wordCount > maxWords :
                return "text-red-600"
            default:
                return "text-green-600"
        }
    }

    return (
        <div className="grid grid-cols-1 gap-6 rounded-lg p-6 text-center sm:grid-cols-3 shadow-md border-l-7 border-purple-500">
           <div className="">
                <p className="text-gray-500">Characters</p>
                <p className="text-2xl font-semibold">{stats.characterCount}</p>
            </div>

            <div className="">
                <p className="text-gray-500">Words</p>
                <p className={`${getColor()} text-2xl font-semibold`}>{stats.wordCount}</p>
                <p className="text-xs text-purple-500 font-light mt-3">Min: 25 | Max: 100</p>
            </div>

            {
            showReadingTime && 
            <div className="">
                <p className="text-gray-500">Reading Time</p>
                <p className="text-2xl font-semibold">{stats.readingTime}</p>
            </div>
            }
        </div>
    )
}

export default StatsDisplay;