from flask import jsonify

from Util.Util import md5, status
from Util.EasyConnection import EasyConnection


class User:
	def __init__(self, email, password):
		self.email = email
		self.password = password
		self.connection = EasyConnection()

	def register(self):
		if self.email is not None and self.password is not None:
			if not self.is_registered():
				query = 'INSERT INTO Users VALUES (%s, %s)'
				password = md5(self.password)
				print(password)
				values = (self.email, password)
				self.connection.send_query(query, values)
				return status(201)

			return status(404)

		return status(500)

	def is_registered(self):
		if self.email is not None and self.password is not None:
			query = 'SELECT COUNT(email) AS TOTAL FROM Users WHERE email = %s AND password = %s'
			values = (self.email, md5(self.password))
			total = self.connection.select(query, values)[0][0]
			print(total)
			return total == 1

	def update(self, new_email, new_password):
		if self.is_registered():
			if self.email == new_email and self.password == new_password:
				return status(204)
			query = 'UPDATE Users SET email = %s, password = %s WHERE email = %s AND password = %s'
			values = (new_email, md5(new_password), self.email, md5(self.password))
			self.connection.send_query(query, values)
			return status(200)

		return status(404)

	def delete(self):
		if self.email is not None and self.password is not None:
			if self.is_registered():
				query = 'DELETE FROM Users WHERE email = %s'
				email = (self.email,)
				self.connection.send_query(query, email)
				# OK
				return status(200)
			# Not found
			return status(404)
		# Values not set
		return status(500)

	@staticmethod
	def get_all():
		query = 'SELECT email FROM Users'
		results = EasyConnection().select(query)
		return jsonify(results)
