import "../assets/ratings.css";
import Card from "../components/Card.tsx";
import {useEffect, useState} from "react";

export default function (){
    const [fdata, setFdata] = useState<any>(undefined);

    useEffect(() =>{
	const indx:string = window.location.pathname.split("/")[2];
	const getData = async () => {
	    const resp = await fetch("/b/player/"+indx);
	    if (!resp.ok){
	        console.error("error" + resp.status);
		return;
	    }
	    const data = await resp.json();
	    setFdata(data);
        };

	getData();	
    }, []);

    return(
	<>
	    {fdata && (<Card name={fdata.pname} rating={fdata.ovr} pos={fdata.pos} stats={fdata.stats} display={"block"}/>)}
	</>
    );
}
