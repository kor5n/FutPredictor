import '../App.css'
import "../assets/playerlist.css"
import { useEffect, useState } from 'react'

interface Props {
    stats: string[],
    page: number,
}

interface ListItemProps{
    item: string,
    index: number,
}

function ListItem({item, index}:ListItemProps){
    return(
        <tr key={index}>
            {item.split("|").map((el, index) => (
                <th key={index}><p className='player-text'>{el}</p></th>
            ))}
        </tr>
    )
}

export default function PlayerList({stats, page} : Props){

    

    const [showFirst, setShowFirst] = useState(true);
    const [splitStats, setSplit] = useState<string[][]>();

    useEffect(() => {
        if(stats.length > 0) {
        
            let tmp_array: string[][] = [];
            let tmp_element: string[] = [];

            stats.forEach((element, index) => {
                tmp_element.push(element);

                if ((index + 1) %100 === 0) {
                    tmp_array.push(tmp_element);
                    tmp_element = [];
                }
            });

            if (tmp_element.length > 0) {
                tmp_array.push(tmp_element);
            }

            setSplit(tmp_array);
            requestAnimationFrame(() =>{
                setShowFirst(false)
            })
        }
        
    }, [stats])

    return(
        <div className='player-list'>
            {showFirst && (<p>Loading...</p>)}
            {!showFirst && (
            <table className='player-table'>
                {splitStats && splitStats[0] ? (
                    splitStats[page -1].map((item, index) => (
                        <ListItem item={item} index={index} key={index} />
                    ))
                    ) : (
                    <p>Loading or no data</p>
                )}
            </table>)}
        </div>
    )
}