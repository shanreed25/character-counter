import type { TextInputProps } from '../../types';
// import './TextInput.css'


function TextInput({
    onTextChange, 
    placeholder = "Start typing your content here", 
    initialValue = ""
}: TextInputProps) {

    //React.ChangeEvent: a change event
    //<HTMLTextAreaElement>: comes from a textarea
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        onTextChange(e.target.value)

    }

    return (
        <div className="text-input">
            <textarea 
            placeholder={placeholder}
            defaultValue={initialValue}
            onChange={handleChange}

            // onChange={(e) => onTextChange(e.target.value)}
                //this is contextual typing, the onChange is the context that tells
                // TS the type, because onChange knows e is React.ChangeEvent<HTMLTextAreaElement>
                //this only works when the function is written inline
            //onChange={handleChange} is its own function so TS does not know what e is
                //so you have to tell the handleChange function what type e is
            rows={6}
            />
        </div>
    )
}

export default TextInput;