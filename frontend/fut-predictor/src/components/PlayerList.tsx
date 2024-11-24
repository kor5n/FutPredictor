import '../App.css'
import "../assets/playerlist.css"
import { useState } from 'react'

interface PlayerData {
    stats: string[]
}

export default function PlayerList({stats} : PlayerData){
    /*<p className='player-text' key={index}>
                    {item}
                    </p>*/
    return(
        <div className='player-list'>
            <table className='player-table'>
                {stats.map((item, index)=> (
                    
                        
                    <tr key={index}>
                        <th><p className='player-text'>{item.split("|")[0]}</p></th>
                        <th><p className='player-text'>{item.split("|")[1]}</p></th>
                        <th><p className='player-text'>{item.split("|")[2]}</p></th>
                        <th><p className='player-text'>{item.split("|")[3]}</p></th>
                        <th><p className='player-text'>{item.split("|")[4]}</p></th>
                        <th><p className='player-text'>{item.split("|")[5]}</p></th>
                        <th><p className='player-text'>{item.split("|")[6]}</p></th>
                        <th><p className='player-text'>{item.split("|")[7]}</p></th>
                        <th><p className='player-text'>{item.split("|")[8]}</p></th>
                    </tr>
                    
                    
                ))}
            </table>
        </div>
    )
}