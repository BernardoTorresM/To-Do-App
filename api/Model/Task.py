from flask import jsonify

from Util.Util import status
from Util.EasyConnection import EasyConnection


class Task:
	def __init__(self, name, description, user, done=False):
		self.name = name
		self.description = description
		self.user = user
		self.done = done
		self.connection = EasyConnection()

	def is_complete(self):
		return self.name is not None and self.description is not None and self.user is not None

	def create(self):
		if self.is_complete():
			query = 'INSERT INTO Tasks (name, description, done, user) VALUES (%s, %s, %s, %s)'
			values = (self.name, self.description, self.done, self.user)
			self.connection.send_query(query, values)
			return status(201)
		# Values not set
		return status(500)

	@staticmethod
	def update(id, new_name, new_description, new_done=False):
		if id is not None and new_name is not None and new_description is not None:
			query = 'UPDATE Tasks SET name = %s, description = %s, done = %s WHERE idTask = %s'
			values = (new_name, new_description, new_done, id)
			EasyConnection().send_query(query, values)
			return status(200)

		# Values not set
		return status(500)

	@staticmethod
	def get_tasks(user):
		query = 'SELECT * FROM Tasks WHERE user = %s'
		user = (user,)
		results = EasyConnection().select(query, user)
		return jsonify(results)

	@staticmethod
	def delete(id):
		if id is not None:
			query = 'DELETE FROM Tasks WHERE idTask = %s'
			id = (id,)
			EasyConnection().send_query(query, id)
			return status(200)

		# Values not set
		return status(500)
