import { useState, useEffect } from "react"
import PlayerList from "../components/PlayerList"

export default function(){
    const [error, setError] = useState<boolean>(false);
    const [pname, setPname] = useState<string[]>([]);

    const OnLoadFunc = async () =>{
        try {
            const response: Response = await fetch("http://127.0.0.1:5000/b/stats");
            const data: { [key: string]: (string | number)[] } = await response.json();
      
            if (Math.round(response.status / 100) * 100 === 200) {
              return data.pname as string[]; 
            } else {
              return [];
            }
          } catch (err) {
            console.error("Error fetching data:", err);
            return [];
          }
    }
    

    useEffect(() => {
        const fetchData = async () => {
          const names = await OnLoadFunc();
          if (names.length === 0) {
            setError(true);
          } else {
            setPname(names);
          }
        };
        
        fetchData();
      }, []);

    return(
        <>
            {error ? (
                <p>Error loading player names.</p>
            ) : (
                <PlayerList pname={pname} pos={[]} ovr={[]} pace={[]} shoot={[]} drib={[]} pass={[]} def={[]} phys={[]} />
            )}
        </>
    );
        
    
}