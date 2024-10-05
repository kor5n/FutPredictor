from flask import Flask, request, jsonify
from futpredicttrain import model_predict
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/b/*": {"origins": "http://localhost:5173"}})

@app.route("/b/stats", methods=["POST", "GET"])
def upload_stats():
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
    return jsonify({"message" : str(rating)}), 200

if __name__ == "__main__":
    app.run(debug=True)