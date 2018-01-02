
## Folder structure

- `frontend/` - Ether wallpaper client app
- `backend/` - Ether wallpaper backend API
- `eht-wallpaper-gen/` - Ether wallpaper generator

## Requirements

- Backend & Generator

``` config
python >= 3.4.0
```

- Frontend

``` config
nodejs >= 8.9.0
npm >= 8.9.0 
yarn >= 1.3.2 (optional)
```

## Setup

- Backend

``` bash
cd backend
pip3 install -r requirements.txt
python3 manage.py migrate api
```

- Frontend

``` bash
cd frontend
yarn install
```

Edit .env file in `frontend` folder

```ini
  REACT_APP_API_ENDPOINT=http://localhost:8000/ # endpoint of backend API
  PORT=8070 # port to run on

```

## Running

- Backend

```bash
python3 manage.py runserver
```

This will run django server on port 8000

- Frontend

```bash
yarn start
```

This will run npm server on port 8070 or port set in `.env` file
