# API for Trakstr App

TRAKSTR: Application that tracks reward data

## Features

- Connect to database
- Endpoints for retrieving data

## Technology

- NodeJS
- Express framework
- Mongodb

## Skills Displayed

- Simple API design
- Document database querying
  
## How To Use

NOTE: Ensure all steps completed from [Trakstr-Scraper](https://github.com/jakeguillory/trakstr-scraper) repo

NOTE: The instructions below were tested on Windows 11 running Ubuntu 22.04.2 on WSL with Node version 18.16.0

1. **Ensure a recent NodeJS installation**

2. **Copy this repo**

```
git clone https://github.com/jakeguillory/trakstr-api.git && cd trakstr-api
```

3. **Install Dependencies**

```
npm install
```

4. **Start API**

```
node app
```

5. **Test**

Run the following in terminal

```
curl http://localhost:3001/united
```
