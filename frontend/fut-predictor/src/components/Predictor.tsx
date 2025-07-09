import { useState } from 'react'
import '../App.css'

function Predictor() {

  const [rating, setRating] = useState<string>("")

  const [cardDisplay, setCardDisplay] = useState<string>("none")

  const [formData, setFormData] = useState({
    pname: '',
    position: '',
    pace: 0,
    shoot: 0,
    pass: 0,
    drib: 0,
    def: 0,
    phys: 0
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const sess:object = {
      "playername": formData.pname,
      "position": formData.position,
      "pace": formData.pace,
      "shooting": formData.shoot,
      "passing": formData.pass,
      "dribbling": formData.drib,
      "defending": formData.def,
      "physical": formData.phys
    }
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(sess)
    }
    const response:Response = await fetch("/b/predict", options)
    const data: { [key: string]: string } = await response.json()
    if(Math.round(response.status / 100) * 100 === 200){
      setRating(data.message)
      setCardDisplay("block")
    }
  };

  return (
    <div className='predict-div'>
      <div className='fifa-card'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="pname">Player Name</label><br />
            <input type="text" name="pname" onChange={handleInputChange} value={formData.pname}/><br />
          </div>
          <div>
          <label htmlFor="position">Position</label><br />
            <select name="position" onChange={handleInputChange} value={formData.position}>
              <option value="">Select position</option>
              <option value="GK">Goalkeeper</option>
              <option value="CB">Center Back</option>
              <option value="LB">Left Back</option>
              <option value="RB">Right Back</option>
              <option value="CDM">Defensive Midfielder</option>
              <option value="CM">Central Midfielder</option>
              <option value="CAM">Attacking Midfielder</option>
              <option value="LM">Left Midfielder</option>
              <option value="RM">Right Midfielder</option>
              <option value="LW">Left Winger</option>
              <option value="RW">Right Winger</option>
              <option value="ST">Striker</option>
            </select>
          </div>
          <div className='stat-container'>
            <div className='stat-div'>
              <label htmlFor="pace">{formData.position === "GK" ? "Diving" : "Pace"}</label>
              <input className='stat-count' type="number" name='pace' min="0" max="99"  onChange={handleInputChange} value={formData.pace === 0? "" : formData.pace}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="shoot">{formData.position === "GK" ? "Handling" : "Shooting"}</label>
              <input className='stat-count' type="number" name='shoot' min="0" max="99"  onChange={handleInputChange} value={formData.shoot === 0 ? "" : formData.shoot}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="pass">{formData.position === "GK" ? "Kicking" : "Passing"}</label>
              <input className='stat-count' type="number" name='pass' min="0" max="99"  onChange={handleInputChange} value={formData.pass === 0? "" : formData.pass}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="drib">{formData.position === "GK" ? "Positioning" : "Dribbling"}</label>
              <input className='stat-count' type="number" name='drib' min="0" max="99"  onChange={handleInputChange} value={formData.drib === 0? "" : formData.drib}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="def">{formData.position === "GK" ? "Reflexes" : "Defending"}</label>
              <input className='stat-count' type="number" name='def' min="0" max="99"  onChange={handleInputChange} value={formData.def === 0? "" : formData.def}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="phys">Physical</label>
              <input className='stat-count' type="number" name='phys' min="0" max="99"  onChange={handleInputChange} value={formData.phys === 0? "" : formData.phys}/>
            </div>
          </div>
          <div><input type="submit" value="Submit"/></div>
        </form>
      </div>
      <div className='fifa-card res-card' style={{"display" : cardDisplay, "background": +rating >= 75 ? 'gold' : +rating >= 65 ? 'silver' : '#CE8946'}}>
          <div className='upper-card'>
            <p>{rating}</p>
            <p className='res-pos'>{formData.position}</p>
          </div>
          <div className='middle-card'></div>
          <div className='lower-card'>
            <div className='pl-name'><p>{formData.pname}</p></div>
            <div className='stat-coll'>
              <div className='left-stats'>
                <p className='stat-label'>{formData.pace} {formData.position === "GK" ? "DIV" : "PAC"}</p>
                <p className='stat-label'>{formData.shoot} {formData.position === "GK" ? "KIC" : "SHO"}</p>
                <p className='stat-label'>{formData.pass} {formData.position === "GK" ? "REF" : "PAS"}</p>
              </div>
              <div className='right-stats'>
                <p className='stat-label'>{formData.drib} {formData.position === "GK" ? "HAN" : "DRI"}</p>
                <p className='stat-label'>{formData.def} {formData.position === "GK" ? "POS" : "DEF"}</p>
                <p className='stat-label'>{formData.phys} PHY</p>
              </div>
              <div className='border-line'></div>
            </div>
          </div>
      </div>
  </div>
  
    
    
  )
}

export default Predictor
