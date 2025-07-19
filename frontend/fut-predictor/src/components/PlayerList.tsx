import '../App.css'
import "../assets/playerlist.css"
import { useEffect, useState } from 'react'

interface PlayerData {
    stats: string[]
}

export default function PlayerList({stats} : PlayerData){

    const [showFirst, setShowFirst] = useState(true)

    useEffect(() => {
        if(stats.length > 0) {
            requestAnimationFrame(() =>{
                setShowFirst(false)
            })
        }
    }, [stats])

    return(
        <div className='player-list'>
            {showFirst && (<p>Loading...</p>)}
            {!showFirst && (<table className='player-table'>
                {stats.map((item, index)=> (
                    <tr key={index}>
                        {item.split("|").map((el) => (
                            <th><p className='player-text'>{el}</p></th>
                        ))}
                    </tr>
                ))}
            </table>)}
        </div>
    )
}