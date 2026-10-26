import type { StatsDisplayProps } from "../../types";

function StatsDisplay({
  stats,
  showReadingTime = true,
  minWords,
  maxWords,
  targetReadingTime,
}: StatsDisplayProps) {

  function getReadingTimeColor(): string {
    if (targetReadingTime === undefined){
      return "";
    }

    switch (true){
      case stats.readingTime >= targetReadingTime:
      return "text-green-600";
      default:
        return "text-gray-500";

    }
  }

  function getWordCountColor(): string {
    if (minWords === undefined || maxWords === undefined) {
      return "";
    }

    switch (true) {
      case stats.wordCount < minWords || stats.wordCount > maxWords:
        return "text-red-600";
      default:
        return "text-green-600";
    }
  }

  function formatTime(num: number): string {//formats any number
    //minutes look like a decimal, something like 0.455
    //need it to be readable like 3 min 15 sec, 3 min 15 sec

    //GET SECONDS
    //convert minutes to seconds
    //0.455 minutes * 60 = 27.30 seconds
    const secondsAsDecimal = num * 60;

    //seconds can still have decimals
    //remove decimal by rounding to the nearest whole second
    //27.30 becomes 27 seconds
    const wholeSeconds = Math.round(secondsAsDecimal);

    //seconds left after minutes
    const finalSeconds = wholeSeconds % 60;

    //GET MINUTES
    //how many minutes can wholeSeconds make
    //27 /60 = 0.45
    const minutesAsDecimal = wholeSeconds / 60;

    //minutes can be a decimal
    //round down and remove decimals
    //0.45 becomes 0
    const finalMinutes = Math.floor(minutesAsDecimal);

    //if reading time is less than a minute, only return seconds
    // if (finalMinutes === 0) {
    //   return `0:${finalSeconds}`;
    // }

    if (finalMinutes === 0) {
      return `${finalSeconds} sec`;
    }

    // return finalSeconds === 0
    //   ? `${finalMinutes}:00`//if there are no seconds, just return minutes
    //   : `${finalMinutes}:${finalSeconds}`

    return finalSeconds === 0
      ? `${finalMinutes} min`//if there are no seconds, just return minutes
      : `${finalMinutes} min ${finalSeconds} sec`;

    
  }

  return (
    <div className="grid grid-cols-1 gap-6 rounded-lg p-6 text-center sm:grid-cols-3 shadow-md border-l-7 border-purple-500">
      <div className="">
        <p className="text-gray-500">Characters</p>
        <p className="text-2xl font-semibold">{stats.characterCount}</p>
      </div>

      <div className="">
        <p className="text-gray-500">Words</p>
        <p className={`${getWordCountColor()} text-2xl font-semibold transition-colors duration-400`}>
          {stats.wordCount}
        </p>

        {minWords !== undefined && maxWords !== undefined && (
          <p className="text-xs text-purple-500 font-light mt-3">
            Min: {minWords} | Max: {maxWords}
          </p>
        )}

        {/* when over the word max show an alert */}
        {maxWords !== undefined && stats.wordCount > maxWords && (
          <p className="text-xs text-red-500 font-bold mt-1" role="alert">
            {stats.wordCount - maxWords} words over the limit
          </p>
        )}
      </div>

      {showReadingTime && (
        <div className="">
          <p className="text-gray-500">Reading Time</p>
          <p className={`${getReadingTimeColor()} text-2xl font-semibold transition-colors duration-400`}>
            {formatTime(stats.readingTime)}
          </p>

          {targetReadingTime !== undefined && (
            <p className="text-xs text-purple-500 font-light mt-3">
              Target: {formatTime(targetReadingTime)}
            </p>
    )}
        </div>
      )}


    
    </div>
  );
}

export default StatsDisplay;
