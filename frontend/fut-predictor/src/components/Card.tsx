import "../assets/card.css";
import { useState, useEffect } from 'react';

interface Stats {
    name: string;
    rating: string;
    pos: string;
    stats: number[];
    display: "none" | "block";
    image?: string|false;
}

function ImageBtn(){
    const [img, setImg] = useState<string>("");
    const [btnDimen, setBtnDimen] = useState<string[]>([]);

    const uploadImg = (e) => {
	const file = e.target.files[0];
	if (file && file.type.startsWith("image/")){
	    setImg(file);
	    console.log(img);
	}
	setBtnDimen(["37%", "-10px", "55px"]);
    };

    return(
        <div className="upload-wrapper">
	    {img === "" ? (
	  	<button className="img-btn">+</button>  
	    ) 
   	    : (<img className="profile-img" src={URL.createObjectURL(img)} />)}
	    <input
	    type={"file"}
	    accept={"image/*"}
	    onChange={uploadImg}
	    style={{height: btnDimen[0], width: btnDimen[0], top: btnDimen[1], left: btnDimen[2]}}/>
	</div>
    );
}

export default function Card({name, rating, pos, stats, display, image} : Stats){
    return(
        <div className='fifa-card res-card' style={{"display" : display, "background": +rating >= 75 ? 'gold' : +rating >= 65 ? 'silver' : '#CE8946'}}>
          <div className='upper-card'>
	    <div className='upper-u'>
	         <p>{rating}</p>
                 <p className='res-pos'>{pos}</p>
	    </div>
	    <div className='upper-l'>{image === false ? (<ImageBtn />) : (<span>{image}</span>)}</div>
          </div>
          <div className='middle-card'></div>
          <div className='lower-card'>
            <div className='pl-name'><p>{name}</p></div>
            <div className='stat-coll'>
              <div className='left-stats'>
                <p className='stat-label'>{stats[0]} {pos === "GK" ? "DIV" : "PAC"}</p>
                <p className='stat-label'>{stats[1]} {pos === "GK" ? "KIC" : "SHO"}</p>
                <p className='stat-label'>{stats[2]} {pos === "GK" ? "REF" : "PAS"}</p>
              </div>
              <div className='right-stats'>
                <p className='stat-label'>{stats[3]} {pos === "GK" ? "HAN" : "DRI"}</p>
                <p className='stat-label'>{stats[4]} {pos === "GK" ? "POS" : "DEF"}</p>
                <p className='stat-label'>{stats[5]} PHY</p>
              </div>
              <div className='border-line'></div>
            </div>
          </div>
      </div>
    )
}
