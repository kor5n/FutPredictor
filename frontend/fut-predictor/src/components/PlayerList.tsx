import '../App.css'

interface PlayerData {
    pname: string[],
    pos: string[],
    ovr: number[],
    pace: number[],
    shoot: number[],
    pass: number[],
    drib: number[],
    def: number[],
    phys: number[]
}

export default function PlayerList({pname, pos, ovr, pace, shoot, pass, drib, def, phys} : PlayerData){

    return(
        <>
            {pname.map((item, index)=> (
                <p className='player-text' key={index}>
                    {item}
                </p>
            ))}
        </>
    )
}