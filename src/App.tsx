import CharacterCounter from './components/CharacterCounter/CharacterCounter'

function App() {

  return (
    <main className='mx-auto max-w-2xl mt-50'>
      <CharacterCounter minWords={25} maxWords={100} targetReadingTime={0.25} />
    </main>
  )
}

export default App
