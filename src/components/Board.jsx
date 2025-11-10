import Card from './Card'
import { useEffect, useState } from 'react'

export default function Board(){
    const [species, setSpecies] = useState({})

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=10')
            const data = (await response.json())
            setSpecies(data)
        } 
        fetchData()
    }, [])
    return(
        <>
        <Card></Card>
        <ul>
            {species.results ? species.results.map((item) => <li key={item.name}>{item.name}</li>) 
            : "Loading"}
        </ul>
        </>
    )
}