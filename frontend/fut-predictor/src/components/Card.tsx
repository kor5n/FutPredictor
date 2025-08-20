interface Stats {
    name: string;
    rating: string;
    pos: string;
    stats: number[];
    display: "none" | "block";
}

export default function Card({name, rating, pos, stats, display} : Stats){
    return(
        <div className='fifa-card res-card' style={{"display" : display, "background": +rating >= 75 ? 'gold' : +rating >= 65 ? 'silver' : '#CE8946'}}>
          <div className='upper-card'>
            <p>{rating}</p>
            <p className='res-pos'>{pos}</p>
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
