from flask import Flask, render_template, request, jsonify, session
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = "interviewgod_secret_2026"

# ── In-memory data store ──
DATA = {
    "candidates": [
        {"id": 1, "name": "Rahul Verma",  "email": "rahul@email.com",  "initials": "RV", "color": "#5B4FE8", "added": "Apr 08, 2026", "status": "Completed",  "score": 78,  "deadline": "Apr 20, 2026", "round": 1},
        {"id": 2, "name": "Sneha Kapoor", "email": "sneha@email.com",  "initials": "SK", "color": "#E24B4A", "added": "Apr 07, 2026", "status": "Terminated", "score": 31,  "deadline": "Apr 20, 2026", "round": 1},
        {"id": 3, "name": "Arjun Singh",  "email": "arjun@email.com",  "initials": "AS", "color": "#00C48C", "added": "Apr 06, 2026", "status": "Sent",       "score": None,"deadline": "Apr 20, 2026", "round": 1},
        {"id": 4, "name": "Pooja Mehta",  "email": "pooja@email.com",  "initials": "PM", "color": "#BA7517", "added": "Apr 05, 2026", "status": "Not Sent",   "score": None,"deadline": "Apr 20, 2026", "round": 1},
        {"id": 5, "name": "Kiran Nair",   "email": "kiran@email.com",  "initials": "KN", "color": "#534AB7", "added": "Apr 04, 2026", "status": "Completed",  "score": 91,  "deadline": "Apr 20, 2026", "round": 1},
    ],
    "groups": [
        {"id": 1, "title": "Senior React Developer", "dept": "Frontend Engineers", "total": 12, "sent": 10, "attempted": 8,  "status": "Active",     "notif": 3},
        {"id": 2, "title": "Product Manager",         "dept": "Product Team",       "total": 8,  "sent": 6,  "attempted": 5,  "status": "Ongoing",    "notif": 0},
        {"id": 3, "title": "Data Analyst",            "dept": "Analytics Team",     "total": 21, "sent": 18, "attempted": 12, "status": "Reviewing",  "notif": 1},
        {"id": 4, "title": "DevOps Engineer",         "dept": "Infrastructure",     "total": 5,  "sent": 5,  "attempted": 5,  "status": "Completed",  "notif": 0},
    ],
    "booked_slots": [],
    "minutes": 150,
}

# ── Pages ──
@app.route("/")
def landing():
    return render_template("landing.html")

@app.route("/signup")
def signup():
    return render_template("auth.html", mode="signup")

@app.route("/login")
def login():
    return render_template("auth.html", mode="login")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html", data=DATA)

@app.route("/groups")
def groups():
    return render_template("groups.html", groups=DATA["groups"])

@app.route("/candidates")
def candidates():
    return render_template("candidates.html", candidates=DATA["candidates"])

@app.route("/reports")
def reports():
    candidate = next((c for c in DATA["candidates"] if c["id"] == 1), None)
    return render_template("reports.html", candidate=candidate)

@app.route("/store")
def store():
    return render_template("store.html", minutes=DATA["minutes"])

@app.route("/demo")
def demo():
    return render_template("demo.html", booked=DATA["booked_slots"])

@app.route("/candidate-portal")
def candidate_portal():
    return render_template("candidate_portal.html")

# ── API endpoints ──
@app.route("/api/login", methods=["POST"])
def api_login():
    session["user"] = request.json.get("email")
    return jsonify({"success": True})

@app.route("/api/groups", methods=["POST"])
def api_add_group():
    g = request.json
    g["id"] = len(DATA["groups"]) + 1
    g.setdefault("total", 0); g.setdefault("sent", 0)
    g.setdefault("attempted", 0); g.setdefault("status", "Active"); g.setdefault("notif", 0)
    DATA["groups"].append(g)
    return jsonify({"success": True, "group": g})

@app.route("/api/candidates", methods=["POST"])
def api_add_candidate():
    c = request.json
    c["id"] = len(DATA["candidates"]) + 1
    c.setdefault("initials", c["name"][:2].upper())
    c.setdefault("color", "#5B4FE8"); c.setdefault("status", "Not Sent")
    c.setdefault("score", None); c.setdefault("round", 1)
    c["added"] = datetime.now().strftime("%b %d, %Y")
    DATA["candidates"].append(c)
    return jsonify({"success": True, "candidate": c})

@app.route("/api/candidates/<int:cid>", methods=["DELETE"])
def api_delete_candidate(cid):
    DATA["candidates"] = [c for c in DATA["candidates"] if c["id"] != cid]
    return jsonify({"success": True})

@app.route("/api/book-demo", methods=["POST"])
def api_book_demo():
    slot = request.json
    DATA["booked_slots"].append(slot)
    return jsonify({"success": True})

@app.route("/api/buy-minutes", methods=["POST"])
def api_buy_minutes():
    mins = request.json.get("minutes", 0)
    DATA["minutes"] += mins
    return jsonify({"success": True, "total": DATA["minutes"]})

@app.route("/api/extract-skills", methods=["POST"])
def api_extract_skills():
    jd = request.json.get("jd", "").lower()
    skill_map = {
        "python": "Python", "java": "Java", "react": "React.js",
        "node": "Node.js", "sql": "SQL", "aws": "AWS",
        "docker": "Docker", "kubernetes": "Kubernetes",
        "machine learning": "Machine Learning", "typescript": "TypeScript",
        "javascript": "JavaScript", "css": "CSS", "html": "HTML",
        "rest": "REST APIs", "mongodb": "MongoDB", "postgres": "PostgreSQL",
    }
    found = [v for k, v in skill_map.items() if k in jd]
    return jsonify({"skills": found or ["Communication", "Problem Solving", "Teamwork"]})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
