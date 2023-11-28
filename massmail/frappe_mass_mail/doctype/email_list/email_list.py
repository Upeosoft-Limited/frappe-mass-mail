# Copyright (c) 2023, Karani Geoffrey and contributors
# For license information, please see license.txt

import frappe
import uuid
from frappe.model.document import Document

class EmailList(Document):
	def before_insert(self):
		self.list_id = uuid.uuid4()