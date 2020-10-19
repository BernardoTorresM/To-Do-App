from flask import Blueprint, request

from Model.User import User

user_controller = Blueprint('user_controller', __name__)


@user_controller.route('/user', methods=['GET'])
def get_users():
	return User.get_all()


@user_controller.route('/user', methods=['POST'])
def register_user():
	return User(
		request.json['email'],
		request.json['password']
	).register()


@user_controller.route('/user', methods=['DELETE'])
def delete_user():
	return User(
		request.json['email'],
		request.json['password']
	).delete()


@user_controller.route('/user', methods=['PATCH', 'PUT'])
def patch_user():
	return User(
		request.json['old_email'],
		request.json['old_password']
	).update(
		request.json['new_email'],
		request.json['new_password']
	)
