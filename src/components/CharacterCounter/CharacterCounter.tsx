import TextInput from "../TextInput/TextInput";
import { useState } from "react";
import type { CharacterCounterProps } from "../../types";

function CharacterCounter({minWords = 25, maxWords = 100}: CharacterCounterProps) {
    const [userText, setUserText] = useState<string>("");

    //takes a plain string, not an event because TextInput uses e.target.value out of the event
    // Character Counter is the parent and never has to deal the event type at all
    function handleTextChange(text: string){
        setUserText(text)
    }

    const trimmedUserText = userText.trim();
    const splitWordCount = trimmedUserText.split(/\s+/).length;
    const wordCount = trimmedUserText === '' ? 0 : splitWordCount


    return (
        <div className="stat character-counter">
            <TextInput onTextChange={handleTextChange} />
            <p>{userText.length}</p>
            <p>{wordCount}</p>
        </div>
    )
}

export default CharacterCounter;