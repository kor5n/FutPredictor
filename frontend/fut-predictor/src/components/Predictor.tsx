import { useState } from 'react'
import '../App.css'

function Predictor() {

  const [rating, setRating] = useState()

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const sess = {
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
    const response = await fetch("http://127.0.0.1:5000/b/predict", options)
    const data = await response.json()
    if(response.status == 200){
      setRating(data.message)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pname">Player Name</label><br />
          <input type="text" name="pname" onChange={handleInputChange} value={formData.pname}/><br />
        </div>
        <div>
        <label htmlFor="position">Position</label><br />
          <select name="position" onChange={handleInputChange} value={formData.position}>
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
        <div>
          <label htmlFor="pace">Pace</label><br />
          <input type="number" name='pace' min="0" max="99"  onChange={handleInputChange} value={formData.pace}/><br />
          <label htmlFor="shoot">Shooting</label><br />
          <input type="number" name='shoot' min="0" max="99"  onChange={handleInputChange} value={formData.shoot}/><br />
          <label htmlFor="pass">Passing</label><br />
          <input type="number" name='pass' min="0" max="99"  onChange={handleInputChange} value={formData.pass}/><br />
          <label htmlFor="drib">Dribbling</label><br />
          <input type="number" name='drib' min="0" max="99"  onChange={handleInputChange} value={formData.drib}/><br />
          <label htmlFor="def">Defending</label><br />
          <input type="number" name='def' min="0" max="99"  onChange={handleInputChange} value={formData.def}/><br />
          <label htmlFor="phys">Physical</label><br />
          <input type="number" name='phys' min="0" max="99"  onChange={handleInputChange} value={formData.phys}/><br />
        </div>
        <div><input type="submit" value="Submit"/></div>
      </form>
      <h2>{rating}</h2>
    </div>
    
  )
}

export default Predictor
