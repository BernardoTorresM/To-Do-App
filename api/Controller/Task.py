from flask import Blueprint, request

from Model.Task import Task

task_controller = Blueprint('task_controller', __name__)


@task_controller.route('/<user_email>/tasks', methods=['GET'])
def get_tasks(user_email):
	return Task.get_tasks(user_email)


@task_controller.route('/tasks', methods=['POST'])
def create_task():
	task = Task(
		request.json['name'],
		request.json['description'],
		request.json['email']
	)
	return task.create()


@task_controller.route('/tasks', methods=['PATCH', 'PUT'])
def update_task():
	return Task.update(
		request.json['id'],
		request.json['name'],
		request.json['description'],
		request.json['done']
	)


@task_controller.route('/tasks', methods=['DELETE'])
def delete_task():
	return Task.delete(request.json['id'])
