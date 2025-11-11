import { useState } from 'react'
import './App.css'
import MyGrid from './components/MyGrid'
import pokemonLogo from './assets/Pokemon-logo.png';

function App() {
  const [score, setScore] = useState(0)
  const [modal, setModal] = useState(false)
  const [shouldReset, setShouldReset] = useState(false)

  function increaseScore() {
    setScore(prev => prev + 1);
  }

  return (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#ffde00]/50 z-50 text-center">
          <div className="bg-blue-100 p-8 rounded shadow-lg">
            <h2 className="text-xl text-[#3b4cca] font-bold mb-4">Game Over!</h2>
            <p className="text-[#3b4cca]">You scored {score} points.</p>
            <button
              onClick={() => {
                setModal(false);
                setScore(0);
                setShouldReset(true);
              }}
              style={{ background: '#3b4cca', color: 'white' }}
              className="mt-4 px-4 py-2 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-blue-100 mx-auto flex flex-col gap-5 min-w-250">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-white">
          <img src={pokemonLogo} className="w-1/6 h-auto object-contain" alt="Pokemon Logo" />
          <h1 className="mt-4 text-[#3b4cca] font-medium" style={{ fontFamily: '"Lato", sans-serif' }}>Memory Game</h1>
          <h3 style={{ fontFamily: '"Lato", sans-serif' }}>Get points by clicking images but don't click an image more than once!</h3>
        </div>
        <div className="flex-1 flex items-center justify-center w-2/3 mx-auto max-h-full overflow-auto">
          < MyGrid 
          increaseScore={increaseScore} 
          setScore={setScore} 
          setModal={setModal} 
          shouldReset={shouldReset} 
          setShouldReset={setShouldReset}/>
        </div>
        <div className="flex-1 flex items-center justify-center mx-auto text-xl" style={{ fontFamily: '"Lato", sans-serif' }}>Current Score: {score}</div>
      </div>
    </>
  )
}

export default App
