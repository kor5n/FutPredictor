import { useState, useEffect } from "react"
import PlayerList from "../components/PlayerList"

export default function(){
    const [error, setError] = useState<boolean>(false);
    const [stats, setStats] = useState<string[]>([]);
    const [searchPrompt, setPrompt] = useState<string>("null");

    const ChangePrompt = (event: any) => {
      const { value } = event.target;
      setPrompt(
        value
      );
  };

    const SubmitPrompt = async (event : any) =>{
      event.preventDefault();
      await fetchData();
    }

    const LoadFunc = async () =>{
        try {
            const response: Response = await fetch("http://127.0.0.1:5000/b/stats/"+searchPrompt);
            const data: { [key: string]: (string | number)[] } = await response.json();
      
            if (Math.round(response.status / 100) * 100 === 200) {
                const sep:string = "|"
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

    const fetchData = async () => {
          const names = await LoadFunc();
          if (names.length === 0) {
            setError(true);
          } else {
            setStats(names);
          }
    };

    useEffect(() =>{ 
      fetchData()
    }, [])

    return(
        <>
          <form onSubmit={SubmitPrompt}>
            <input type="text" className="player-search" name="prompt" value={searchPrompt} onChange={ChangePrompt}></input>
            <input type="submit" />
          </form>
          {error ? (
              <p>Error loading player names.</p>
          ) : (
              <PlayerList stats={stats} />
          )}
        </>
    );
        
    
}