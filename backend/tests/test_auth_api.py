import pytest
import json
from app.main import create_app, db

app = create_app('testing')

@pytest.fixture
def client():
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_register_user(client):
    # Test successful registration
    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    data = json.loads(response.data)
    assert response.status_code == 201
    assert 'access_token' in data

    # Test duplicate username
    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'password': 'anotherpassword'
    })
    data = json.loads(response.data)
    assert response.status_code == 400
    assert 'error' in data
    assert data['error'] == 'Username already taken'

def test_login_user(client):
    # First register a user
    client.post('/api/auth/register', json={
        'username': 'loginuser',
        'password': 'loginpassword'
    })

    # Test successful login
    response = client.post('/api/auth/login', json={
        'username': 'loginuser',
        'password': 'loginpassword'
    })
    data = json.loads(response.data)
    assert response.status_code == 200
    assert 'access_token' in data

    # Test invalid credentials
    response = client.post('/api/auth/login', json={
        'username': 'loginuser',
        'password': 'wrongpassword'
    })
    data = json.loads(response.data)
    assert response.status_code == 401
    assert 'error' in data
    assert data['error'] == 'Invalid credentials'
