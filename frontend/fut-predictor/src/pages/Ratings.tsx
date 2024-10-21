import { useState, useEffect } from "react"
import PlayerList from "../components/PlayerList"

export default function(){
    const [error, setError] = useState<boolean>(false);
    const [stats, setStats] = useState<string[]>([]);

    const OnLoadFunc = async () =>{
        try {
            const response: Response = await fetch("http://127.0.0.1:5000/b/stats");
            const data: { [key: string]: (string | number)[] } = await response.json();
      
            if (Math.round(response.status / 100) * 100 === 200) {
                const sep:string = " "
                let propList:string[] = ["Name" +sep+"position"+sep +"overall"+sep+ "pace"+sep+ "shooting" +sep+"passing"+sep+ "dribbling"+sep+ "defending"+sep+ "physical"] 
                for (let i:number=0;i<data.pname.length;i++){
                    const tmp:string = data.pname[i].toString() +sep+ data.pos[i].toString() +sep+ data.ovr[i].toString() +sep+ data.pace[i].toString() +sep+ data.shoot[i].toString()
                    +sep+ data.pass[i].toString() +sep+ data.drib[i].toString() +sep+ data.def[i].toString() +sep+ data.phys[i].toString()
                    propList.push(tmp)
                }
                return propList as string[]; 
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
            setStats(names);
          }
        };
        
        fetchData();
      }, []);

    return(
        <>
            {error ? (
                <p>Error loading player names.</p>
            ) : (
                <PlayerList stats={stats} />
            )}
        </>
    );
        
    
}