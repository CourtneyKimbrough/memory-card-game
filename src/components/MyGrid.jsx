import Card from './Card'
import { useEffect, useState } from 'react'

export default function MyGrid({ increaseScore, setModal, shouldReset, setShouldReset, setScore }) {
    const [species, setSpecies] = useState([])
    const [clickedSpecies, setClickedSpecies] = useState([]);
    const [allSpecies, setAllSpecies] = useState([])

    function shuffle(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    useEffect(() => {
        resetGame();
    }, []);


    useEffect(() => {
        if (shouldReset) {
            console.log("should reset")
            resetGame();
            setShouldReset(false);
        }
    }, [shouldReset]);

    async function resetGame() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1010');
        const data = await response.json();
        const ids = data.results.map(item => {
            const id = item.url.split('/').filter(Boolean).pop();
            return id;
        });
        setAllSpecies(ids);
        setClickedSpecies([]);
    }

    useEffect(() => {
        if (allSpecies.length === 0) return;
        let need = 1
        if (clickedSpecies.length < 9) {
            need = (10 - clickedSpecies.length)
        }
        const all = allSpecies.slice().sort(() => 0.5 - Math.random()).slice(0, need)
        const clicked = clickedSpecies.slice().sort(() => 0.5 - Math.random()).slice(0, 10 - need);
        const board = [...all, ...clicked]
        const newboard = shuffle(board)
        setSpecies(newboard);
        console.log('Shuffled board:', newboard);
        console.log('Effect ran');
    }, [clickedSpecies, allSpecies])


    function handleCardClick(id) {
        if (clickedSpecies.includes(id)) {
            setModal(1)
        } else {
            console.log("test")
            const remaining = allSpecies.filter(s => s !== id)
            setAllSpecies(remaining)
            setClickedSpecies((prev) => [...prev, id]);
            increaseScore();
        }
    }

    return (
        <>
            <div className="grid grid-cols-5 grid-rows-2 w-full gap-5 max-h-full overflow-auto">
                {species.length > 0
                    ? species.map((id) => {
                        return (
                            <Card key={id} onClick={() => handleCardClick(id)} imgSrc={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}></Card>
                        );
                    })
                    : "Loading"}
            </div>
        </>
    )
}