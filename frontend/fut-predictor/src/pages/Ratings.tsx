import { useState, useEffect } from "react"
import PlayerList from "../components/PlayerList"
import "../assets/ratings.css"

export default function(){
    const [error, setError] = useState<boolean>(false);
    const [stats, setStats] = useState<string[]>([]);
    const [searchPrompt, setPrompt] = useState<string>("");
    const [pageNum, setPage] = useState<number>(1);

    const ChangePrompt = (event: any) => {
      const { value } = event.target;
      setPrompt(
        value
      );
  };

    const SubmitPrompt = async (event : any) =>{
      event.preventDefault();
      setPage(1);
      await fetchData();
    }

    const LoadFunc = async () =>{
        try {
            let tmp_prompt:string = ""
            if (searchPrompt === ""){
              tmp_prompt = "null"
            }else{
              tmp_prompt = searchPrompt
            }
            const response: Response = await fetch("/b/stats/"+tmp_prompt);

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

    const ChangePage = (increase:number) =>{
      let new_page:number = pageNum + increase;
      if (new_page <=0){
        setPage(pageNum);
      } else{
        setPage(new_page);
      }
    }

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
              <>
                <PlayerList stats={stats} page={pageNum} />
                <div className="page-btn-div">
                  {pageNum >= 2 ? <button className="page-btn prev-page-btn" onClick={() =>{ChangePage(-1)}}>previous page</button> : null}
                  {pageNum<Math.round(stats.length/100)&&stats.length >= 51 ? <button className="page-btn next-page-btn" onClick={() =>{ChangePage(1)}}>next page</button>: null}
                </div>
                {stats.length >= 101 ? <p className="cur-page">page: {pageNum}/{Math.round(stats.length/100)}</p>: null}
              </>
          )}
        </>
    );
        
    
}
