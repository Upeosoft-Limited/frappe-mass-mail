import frappe
import smtplib
from email.mime.text import MIMEText


@frappe.whitelist()
def send_email(message, list, subject):
    email_list = frappe.db.get_all("Email Address", filters={"parent": list}, fields=["email_address", "address_name"])

    sender_email = "upeosoft@gmail.com"
    sender_password = "xswfjxecgrztynoc"


    recipients = []
    for recipient in email_list:
        recipients.append(recipient.email_address)


    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = ', '.join(recipients)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
        smtp_server.login(sender_email, sender_password)
        smtp_server.sendmail(sender_email, recipients, msg.as_string())

        frappe.msgprint("Emails send successfully!")