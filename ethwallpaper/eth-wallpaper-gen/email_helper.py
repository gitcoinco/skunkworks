# -*- coding: utf-8 -*-

"""
    Send email helper
"""

import sendgrid
from sendgrid.helpers.mail import Content, Email, Mail

SUBJECT = "You upload is complete"
BODY = "View your ETHWallpaper here: "
SENDER = "founders@gitcoin.co"


class EmailHelper(object):

    """
    Email helper
    """

    def __init__(self, api_key):
        sg = sendgrid.SendGridAPIClient(apikey=api_key)
        self.client = sg.client

    def send_email_for_wallpaper(self, email, wallpaper_url):
        """
        Send email
        :param email: recepient
        :param wallpaper_url: link to proecessed wallpaper
        """

        from_email = Email(SENDER)
        to_email = Email(email)
        subject = SUBJECT
        content = Content(
            "text/plain", BODY + wallpaper_url)
        mail = Mail(from_email, subject, to_email, content)
        try:
            self.client.mail.send.post(request_body=mail.get())
        except Exception as error:
            print(error)
