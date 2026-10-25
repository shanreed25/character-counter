import type { TextInputProps } from '../../types';
// import './TextInput.css'


function TextInput({
    onTextChange, 
    placeholder = "Start typing your content here", 
    initialValue = ""
}: TextInputProps) {
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        onTextChange(e.target.value)

    }

    return (
        <div className="text-input">
            <textarea 
            placeholder={placeholder}
            defaultValue={initialValue}
            onChange={handleChange}
            rows={6}
            ></textarea>
        </div>
    )
}

export default TextInput;