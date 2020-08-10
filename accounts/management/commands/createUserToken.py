from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    help = 'This management command would create Tokens for all those users whose tokens do not exist.'

    def handle(self, *args, **options):
        allUsers = User.objects.all()
        for each_user in allUsers:
            Token.objects.get_or_create(user=each_user)
            self.stdout.write(self.style.SUCCESS('Successfully Created Token for User "%s"' % each_user))

