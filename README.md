# Character Counter

**A component that helps content writers track their progress while writing articles. The component provides immediate feedback about the content length and estimated reading time, helping writers meet specific content requirements.**

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── CharacterCounter/
│   │   │   └── CharacterCounter.tsx   # parent that holds the text state and calculates stats
│   │   ├── StatsDisplay/
│   │   │   └── StatsDisplay.tsx       # shows characters count, words count, and reading time
│   │   └── TextInput/
│   │       └── TextInput.tsx          # textarea, sends text up with onTextChange
│   ├── types/
│   │   └── index.ts                   # prop and stats interfaces
│   ├── App.css
│   ├── App.tsx                        # CharacterCounter used
│   ├── index.css                      # Tailwind import
│   └── main.tsx  
```

## Component Implementation:
- [X] Implement each component according to its interface requirements.
- [X] Use useState to manage text input and statistics.
- [X] Implement event handlers for text changes.
- [X] Calculate statistics in real-time.

### CharacterCounter
> The parent component. It takes the `CharacterCounterProps` interface (`minWords`, `maxWords`, `targetReadingTime`), with defaults of 25, 100, and 0.25 minutes.

- **State:** `useState<string>` holds the current text.
- **Event handler:** `handleTextChange` receives the new text from TextInput and updates state. It is wrapped in `useCallback`, so the same function is reused between renders instead of being recreated each time.
- **Real-time statistics:** every time the text changes, the component re-renders and recalculates the character count, word count (whitespace-only text counts as 0 words), and reading time (word count divided by 210 words per minute). The results are passed to StatsDisplay as a `TextStats` object.

### TextInput
> A textarea that follows the `TextInputProps` interface (`onTextChange`, `placeholder`, `initialValue`), plus an optional `maxLength` for a character limit.

- **Event handler:** `handleChange` is typed as `React.ChangeEvent<HTMLTextAreaElement>`. It sends the text up to the parent through the `onTextChange` callback.
- **State:** `useState<number>` tracks the text length. When the text reaches `maxLength`, the outline turns red and a warning appears under the textarea.

### StatsDisplay
> Displays the statistics. It follows the `StatsDisplayProps` interface (`stats`, `showReadingTime`), plus optional `minWords`, `maxWords`, and `targetReadingTime` passed down from CharacterCounter.

- **Real-time statistics:** shows the character count, word count, and reading time, and updates on every keystroke because its props change whenever the parent's state changes.
- **Word count goal:** the word count is red below `minWords`, green within the range, and red again above `maxWords`, where a message shows how many words over the limit the text is.
- **Reading time:** formatted as minutes and seconds (for example "1 min 15 sec") and turns green once it reaches `targetReadingTime`.
- `showReadingTime` (default `true`) hides the reading time when set to `false`.

## State Management
- [X] Track the current text input.
- [X] Calculate and update statistics when text changes.
- [X] Handle edge cases (empty input, very long text).

### Tracking the text input
> CharacterCounter stores the text in `useState<string>("")`. TextInput sends every change up through the `onTextChange` callback, and `handleTextChange` saves it to state. CharacterCounter is the only place the full text is stored, so the statistics always come from the same source.

### Updating statistics when the text changes
> The statistics are not stored in separate state. They are calculated from the text on every render:

- **Characters:** `userText.length`
- **Words:** the text is trimmed and split on whitespace (`/\s+/`), so extra spaces, tabs, and line breaks between words are not counted as words
- **Reading time:** word count divided by 210 words per minute

> Calculating them from the text means they can never get out of sync with it. Each keystroke updates the state, which re-renders the component and recalculates all three values.

### Edge cases

**Empty input:** an empty string split on whitespace still returns one item, so the word count would show 1. The code checks for empty trimmed text and returns 0 instead, which also covers input that is only spaces or line breaks. The reading time then shows "0 sec".

**Very long text:**
- The textarea has a 4,000-character limit (`maxLength`). The browser stops typing at the limit and cuts off pasted text that is too long. When the limit is reached, the outline turns red and a warning appears under the textarea.
- When the word count goes over `maxWords`, a message shows how many words over the limit the text is. The writer can keep typing, but can see they are over.
- Reading times of a minute or more are formatted as minutes and seconds (for example "2 min 30 sec") instead of a long decimal.