# Jellyfin Patreon Account Portal

The purpose of this project is to create an account portal
for users to create their accounts and password on jellyfin
if they are a patreon subscriber.

And have a hook to auto remove the user when they unsubscribe

todo list
[x] whitelist create and delete
[x] password reset based on whitelist or patreon sub
[] ensure patreon token is only for subscribers and no one else
[] create tabs in ui to switch between menus for admins
[] figure out admin from patreon ownership
[] add google for whitelist
[] custom login and logout page
[] resend or email templates and sending emails
[] remove users on subscription end using webhooks
[] create docker file and image for deployment
[] webhook on create email system
[] create docs and wiki of how system works

Possible addition
[] Sends emails on new patreons and provide a one time link to create your password.
