"""
    Send email helper
"""
import os

import sendgrid
from sendgrid.helpers.mail import Content, Email, Mail

SUBJECT = "You upload is complete"
BODY = "View your ETHWallpaper here: "
SENDER = "upload@ethwallpeper.co"


def send_email_for_wallpaper(email, wallpaper_url):
    """
    Send email
    :param email: recepient
    :param wallpaper_url: link to proecessed wallpaper
    """

    sg = sendgrid.SendGridAPIClient(
        apikey=os.environ.get('SENDGRID_API_KEY'))
    from_email = Email(SENDER)
    to_email = Email(email)
    subject = SUBJECT
    content = Content(
        "text/plain", BODY + wallpaper_url)
    mail = Mail(from_email, subject, to_email, content)
    sg.client.mail.send.post(request_body=mail.get())
