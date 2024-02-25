This is a CMS website for MU Online private servers compatible with https://github.com/MUnique/OpenMU files.


## Features:

 Character Panel:
 
    * Reset system, can choose at what level to reset, max reset, and the price to reset
    * Add Stats
    * ClearPk, can choose the price in zen
    * Reset Stats, can choose the price in zen

**Account Panel:**

    * Change Password

**Rankings:**

    * Top Reset, level, master level
    * Top Killers
    * Top Guilds
    * Online Players

**Server Statistics:**

    * Show server status
    * Show how many players are online

**Register new Account**

**Downlaod Section**

**Info section**

**News Section**

**Terms and Conditions**


## Getting Started

Inside the .env set your postgres username / password / url
DATABASE_URL="postgresql://username:password@localhost:5432/openmu"
Then in the same .env set the GAMESERVER_URL

Now, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




