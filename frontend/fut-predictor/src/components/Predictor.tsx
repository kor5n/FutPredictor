import { useState } from 'react'
import '../App.css'
import Card from "./Card.tsx"

function Predictor() {

  const [rating, setRating] = useState<string>("")

  const [cardDisplay, setCardDisplay] = useState<"none" | "block">("none")

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
    const response:Response = await fetch("http://127.0.0.1:5000/b/predict", options)
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
              <input className='stat-count' type="number" name='pace' min="0" max="99"  onChange={handleInputChange} value={formData.pace}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="shoot">{formData.position === "GK" ? "Handling" : "Shooting"}</label>
              <input className='stat-count' type="number" name='shoot' min="0" max="99"  onChange={handleInputChange} value={formData.shoot}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="pass">{formData.position === "GK" ? "Kicking" : "Passing"}</label>
              <input className='stat-count' type="number" name='pass' min="0" max="99"  onChange={handleInputChange} value={formData.pass}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="drib">{formData.position === "GK" ? "Positioning" : "Dribbling"}</label>
              <input className='stat-count' type="number" name='drib' min="0" max="99"  onChange={handleInputChange} value={formData.drib}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="def">{formData.position === "GK" ? "Reflexes" : "Defending"}</label>
              <input className='stat-count' type="number" name='def' min="0" max="99"  onChange={handleInputChange} value={formData.def}/>
            </div>
            <div className='stat-div'>
              <label htmlFor="phys">Physical</label>
              <input className='stat-count' type="number" name='phys' min="0" max="99"  onChange={handleInputChange} value={formData.phys}/>
            </div>
          </div>
          <div><input type="submit" value="Submit"/></div>
        </form>
      </div>
      <Card name={formData.pname} rating={rating} display={cardDisplay} pos={formData.position} stats={[formData.pace, formData.shoot, formData.pass, formData.drib, formData.def, formData.phys]}/>
  </div>
  
    
    
  )
}

export default Predictor
