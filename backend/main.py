from flask import Flask, request, jsonify
from futpredicttrain import model_predict
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/b/*": {"origins": "http://localhost:5173"}})

@app.route("/b/predict", methods=["POST", "GET"])
def predict_rating():
    player_name = request.json.get("playername")
    position = request.json.get("position")
    pace = request.json.get("pace")
    shooting = request.json.get("shooting")
    passing = request.json.get("passing")
    dribbling = request.json.get("dribbling")
    defending = request.json.get("defending")
    physical = request.json.get("physical")

    #print(player_name, position, pace, shooting, passing, dribbling, defending, physical)

    if player_name == '' or position == '' or pace == 0 or shooting == 0 or passing == 0 or dribbling == 0 or defending == 0 or physical == 0:
        return jsonify({"message": "We couldnt get all the stats"}), 400
    
    rating = model_predict([player_name, position, int(pace), int(shooting), int(passing), int(dribbling), int(defending), int(physical)])
    try:
        return jsonify({"message" : str(rating)[4:]}), 200
    except Exception as e:
        return jsonify({"message" : e}), 400

@app.route("/b/stats/<string:search_prompt>", methods=["GET"])
def upload_stats(search_prompt):
    stats_csv = pd.read_csv("fifaRatings.csv")
    pname = list(stats_csv["PlayerName"])
    pos= list(stats_csv["Position"])
    ovr = list(stats_csv["OverallRating"])
    pace= list(stats_csv["PaceRating"])
    shoot= list(stats_csv["ShootRating"])
    passing= list(stats_csv["PassRating"])
    drib= list(stats_csv["DribRating"])
    defend= list(stats_csv["DefenseRating"])
    phys= list(stats_csv["PhysicalRating"])
    if search_prompt != "null":
        combined = list(zip(pname, pos, ovr, pace, shoot, passing, drib, defend, phys))
        filtered = [entry for entry in combined if search_prompt.lower() in str(entry[0]).lower()]
        pname, pos, ovr, pace, shoot, passing, drib, defend, phys = zip(*filtered) if filtered else ([], [], [], [], [], [], [], [], [])
        pname, pos, ovr, pace, shoot, passing, drib, defend, phys = map(list, (pname, pos, ovr, pace, shoot, passing, drib, defend, phys))
    
    try:
        return jsonify({"message":"Uploading data succesfully", "pname":pname, "pos":pos, "ovr":ovr, "pace":pace,
                    "shoot":shoot, "pass": passing, "drib": drib, "def":defend, "phys":phys}), 200
    except Exception as e:
        return jsonify({"message": e}), 400

if __name__ == "__main__":
    app.run(debug=True)