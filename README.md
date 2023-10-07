This is a website for a MU Online server made to work with https://github.com/MUnique/OpenMU


## Getting Started

Inside the .env set your postgres username / password / url
DATABASE_URL="postgresql://username:password@localhost:5432/openmu"

Then in the same .env set the GAMESERVER_URL it it referred to the gameserver url

Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Features:

Character Panel:
    Reset system, can choose at what level to reset and the price to reset
    Add Stats
    ClearPk, can choose the price

Account Panel:
    Change Password

Rankings:
    Top Reset, level, master level
    Top Killers
    Top Guilds
    Online Players

Server Statistics:
    Show server status
    Show how many players are online

Register new Account
Downlaod Section
Info section
News Section
Terms and Conditions



