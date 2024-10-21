import '../App.css'

interface PlayerData {
    stats: string[]
}

export default function PlayerList({stats} : PlayerData){
    
    return(
        <>
            {stats.map((item, index)=> (
                <p className='player-text' key={index}>
                    {item}
                </p>
            ))}
        </>
    )
}