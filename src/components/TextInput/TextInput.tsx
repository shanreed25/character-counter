import { useState } from "react";
import type { TextInputProps } from "../../types";

function TextInput({
  onTextChange,
  placeholder = "Start typing your content here",
  initialValue = "",
  maxLength,
}: TextInputProps) {
  //needs a piece of state to  track the length of the text
  const [inputLength, setInputLength] = useState<number>(initialValue.length)

  //returns true if the limit is defined and text has reached the limit
  const limitHit = maxLength !== undefined && inputLength >= maxLength

  const colorClasses = limitHit
    ? "shadow-red-500 ring-2 ring-red-500 focus:ring-red-500"
    : "shadow-purple-500 focus:ring-green-500 focus:ring-2"


  //React.ChangeEvent: a change event
  //<HTMLTextAreaElement>: comes from a textarea
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputLength(e.target.value.length);
    onTextChange(e.target.value);
  }



  return (
    <div className="w-full ">
      <label htmlFor="text-input" className="sr-only">
        Text Content
      </label>
      <textarea
        id="text-input"
        className={`w-full shadow-md p-5 rounded-lg focus:outline-none transition-shadow ${colorClasses}`}
        placeholder={placeholder}
        defaultValue={initialValue}
        maxLength={maxLength}
        onChange={handleChange}
        // onChange={(e) => onTextChange(e.target.value)}
        //this is contextual typing, the onChange is the context that tells
        // TS the type, because onChange knows e is React.ChangeEvent<HTMLTextAreaElement>
        //this only works when the function is written inline
        //onChange={handleChange} is its own function so TS does not know what e is
        //so you have to tell the handleChange function what type e is

        aria-invalid={limitHit}
        aria-describedby={limitHit ? "limit-warning" : undefined}
        rows={10}
      ></textarea>

      {limitHit && (
        <p id="limit-warning" className="text-sm text-red-600 mt-2" role="alert">
          You have reached the {maxLength} character limit.
        </p>
      )}
    </div>
  );
}

export default TextInput;
