"""
seed_demo — idempotent admin user seeder.

Creates a demo login user (email demo@sunset.dev) from the DEMO_ADMIN_PASSWORD
environment variable. Safe to re-run: existing users are left as-is; the demo user's
password is (re)synced each run so the printed credential always works.

Run automatically by the deterministic deploy's SEED stage. Also runnable locally:

    DEMO_ADMIN_PASSWORD=secret123 python manage.py seed_demo
"""

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

DEMO_EMAIL = "demo@sunset.dev"


class Command(BaseCommand):
    help = "Seed idempotent admin user for testing."

    def handle(self, *args, **options):
        User = get_user_model()
        demo_password = os.environ.get("DEMO_ADMIN_PASSWORD") or "demo-password-change-me"

        demo, created = User.objects.get_or_create(
            email=DEMO_EMAIL,
            defaults={"is_staff": True, "is_superuser": True, "is_active": True},
        )
        demo.is_staff = True
        demo.is_superuser = True
        demo.is_active = True
        demo.set_password(demo_password)
        demo.save()
        self.stdout.write(self.style.SUCCESS(
            f"{'Created' if created else 'Updated'} demo login user {DEMO_EMAIL}"
        ))
        self.stdout.write(self.style.SUCCESS("seed_demo complete"))
