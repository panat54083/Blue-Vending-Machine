# Blue Vending Machine

## Tech Stack

**Frontend:** Next.js with TypeScript

**Backend**: Node.js with TypeScript

**Database**: PostgreSQL

~~**Testing**~~

**Deploy on docker**: frontend, ~~backend~~ ,and database

## Installation

- update `.env` file accroding to `.env.example`

- Install frontend and database with docker

```bash
    cd ./deployment
    docker compose up
```

- Install backend with npm

```bash
    cd ..
    cd ./backend

    npm i

    // for seeding database
    npm run migration:run

    npm run dev
```

- open `http://localhost:3000`

## Authors

- [@Panat Siriwongtrakool](https://github.com/panat54083)
- **Email** : panat.siriwong@gmail.com
