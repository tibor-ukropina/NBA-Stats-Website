from app import app
from flask import render_template, request, redirect, jsonify, json, session
import requests

@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template("public/home.html")

@app.route("/nbaPlayers", methods=['POST'])
def nba():

    id = request.form['playerID']

    response = requests.get("https://www.balldontlie.io/api/v1/players/" + id)
    print(response.status_code)
    print(response.json())

    return jsonify(response.json())

@app.route("/playerStats", methods=['POST'])
def nbaStats():

    pid = request.form['playerID']

    print("test " +pid)
    response = requests.get("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + pid)
    print(response.status_code)
    print(response.json())

    return jsonify(response.json())

@app.route("/gameStats", methods=['POST'])
def gameStats():

    gid = request.form['gameID']

    response = requests.get("https://www.balldontlie.io/api/v1/games/" + gid)
    print(response.status_code)
    # print(response.json())

    return jsonify(response.json())

@app.route("/teams", methods=['GET'])
def teams():

    response = requests.get("https://www.balldontlie.io/api/v1/teams")
    print(response.status_code)

    return jsonify(response.json())

@app.route("/games", methods=['GET'])
def games():

    response = requests.get("https://www.balldontlie.io/api/v1/games")
    print(response.status_code)

    return jsonify(response.json())


@app.route("/about")
def lab2():
    return render_template("public/about.html")
