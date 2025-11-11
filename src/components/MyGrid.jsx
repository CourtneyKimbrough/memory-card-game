import Card from './Card'
import { useEffect, useState } from 'react'

export default function MyGrid({ increaseScore, setScore, setModal }) {
    const [species, setSpecies] = useState([])
    const [clickedSpecies, setClickedSpecies] = useState([]);
    const [allSpecies, setAllSpecies] = useState([])

    useEffect(() => {
        resetGame();
    }, []);

    async function resetGame() {
        setModal(1)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1010');
        const data = await response.json();
        const ids = data.results.map(item => {
            const id = item.url.split('/').filter(Boolean).pop();
            return id;
        });
        setAllSpecies(ids);
        setClickedSpecies([]);
        setSpecies(ids.sort(() => 0.5 - Math.random()).slice(0, 10));
    }

    useEffect(() => {
        let need = 1
        if (clickedSpecies.length < 9) {
            need = (10 - clickedSpecies.length)
        }
        const all = allSpecies.slice().sort(() => 0.5 - Math.random()).slice(0, need)
        const clicked = clickedSpecies.slice().sort(() => 0.5 - Math.random()).slice(0, 10 - need);
        const board = [...all, ...clicked]
        setSpecies(board);
    }, [clickedSpecies, allSpecies])


    function handleCardClick(id) {
        if (clickedSpecies.includes(id)) {
            resetGame()
        } else {
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