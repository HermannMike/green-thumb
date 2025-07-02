from flask import Flask
from flask_migrate import Migrate
from flask.cli import with_appcontext
import click
from app import app, db

migrate = Migrate(app, db)

@click.group()
def cli():
    pass

@cli.command('init')
@with_appcontext
def db_init():
    from flask_migrate import init
    init()

@cli.command('migrate')
@with_appcontext
def db_migrate():
    from flask_migrate import migrate
    migrate(message="Migration")

@cli.command('upgrade')
@with_appcontext
def db_upgrade():
    from flask_migrate import upgrade
    upgrade()

if __name__ == '__main__':
    cli()
