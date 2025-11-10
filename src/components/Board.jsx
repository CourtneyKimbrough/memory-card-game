import Card from './Card'
import { useEffect } from 'react'

export default function Board(){
    const [species, setSpecies] = useState('data')

    useEffect(() => {
        async function fetchData() {
            const response = fetch('https://pokeapi.co/api/v2/pokemon-species/')
            const data = (await response).json
            setSpecies(data)
        }
    }, [])
    return(
        <>
        <Card></Card>
        {species}
        </>
    )
}