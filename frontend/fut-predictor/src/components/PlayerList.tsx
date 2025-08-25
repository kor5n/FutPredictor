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
    xtraClass?: string,
}

function ListItem({item, index, xtraClass}:ListItemProps){
    const classArray : string[] = []
    return(
        <tr className={xtraClass} key={index}>
            {item.split("|").map((el, indx) => (
                <th key={indx}><p className={indx === 0 ? 'player-text pname' : 'player-text'}>{indx === 0 && index >= 1 ? (<a href={"/player/"+(index -1).toString()} >{el}</a>) : el }</p></th>
            ))}
        </tr>
    )
}

export default function PlayerList({stats, page} : Props){

    
    const [refTable, setRefTable] = useState<string>();
    const [showFirst, setShowFirst] = useState(true);
    const [splitStats, setSplit] = useState<string[][]>();

    useEffect(() => {
        if(stats.length > 0) {
	    setRefTable(stats[0]);
	    stats.shift();
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
		    <tbody>
			<ListItem item={refTable} index={0} key={0} xtraClass={"first-table"}/>
			{splitStats[page -1].map((item, index) => (
                        <ListItem item={item} index={index +1} key={index+1} xtraClass={(index + 1) % 2 === 0 ? 'second-row': undefined} />))}
	            </tbody>
	        ) : (
                    <p>Loading or no data</p>
                )}
            </table>)}
        </div>
    )
}
