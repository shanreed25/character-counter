import TextInput from "../TextInput/TextInput";
import { useState, useCallback } from "react";
import type { CharacterCounterProps, TextStats } from "../../types";
import StatsDisplay from "../StatsDisplay/StatsDisplay";

//tested numbers between 200 and 260 and
// 210 seemed safe to use
const WORDS_PER_MIN = 210;
function CharacterCounter({minWords = 25, maxWords = 100, targetReadingTime = 0.25}: CharacterCounterProps) {
    const [userText, setUserText] = useState<string>("");

    //takes a plain string, not an event because TextInput uses e.target.value out of the event
    // Character Counter is the parent and never has to deal the event type at all
    // function handleTextChange(text: string){//creates a brand new function each time the component re-renders
    //     setUserText(text)
    // }

    const handleTextChange = useCallback((text: string) => {//useCallback makes it use the same function unless something in the dependency array changes
        setUserText(text)
    }, [])


    //need an object that matches the TextStats interface
    //since this component has the data create it here and pass to StatsDisplay

    const characterCount = userText.length;
    const trimmedUserText = userText.trim();
    const splitWordCount = trimmedUserText.split(/\s+/).length;
    const wordCount = trimmedUserText === '' ? 0 : splitWordCount

    
    //since my variables have the same name as the expected type
    //properties I can write the name once instead of {characterCount: characterCount, wordCount: wordCount,}
    const stats: TextStats = {
        characterCount,
        wordCount,
        readingTime: wordCount / WORDS_PER_MIN
    }


    return (
        <div className="flex flex-col gap-30 rounded-xl border border-gray-300 shadow-lg p-10">
            {/* onTextChange() gets the text from onChange handler */}
            <TextInput onTextChange={handleTextChange} maxLength={4000}/>
            <StatsDisplay 
            stats={stats} 
            minWords={minWords} 
            maxWords={maxWords}
            targetReadingTime={targetReadingTime}
            />
        </div>
    )
}

export default CharacterCounter;