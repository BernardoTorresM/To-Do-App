import json

from flask import Flask

from Controller.Task import task_controller
from Controller.User import user_controller

app = Flask(__name__)

app.register_blueprint(user_controller)
app.register_blueprint(task_controller)

if __name__ == '__main__':
	app.run(debug=True)


@app.route('/')
def index():
	with open("Configuration/routes.json") as routes_file:
		return json.load(routes_file)
