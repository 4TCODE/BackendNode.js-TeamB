# Magic Movers 🚀

## About

In the world of Magic Transporters, there are special people known as Magic
Movers. They use nifty gadgets to move important things. Fueled by virtual magic,
these Movers go on quick missions to carry items around.

## Logic

* We need to create magic items
* We need to create magic mover(s) **(done state)**
  * We can start loading the mover: **(loading state)**
    * We can unload the mover **(done state)**
    * We can start the mission **(in a mission state)**
      * We can end the mission **(done state)**
  * We can put the mover in resting state only if it was in *'done state'* **(resting state)**
* We can get all missions and their information

## Used Technology

* Nest.js
* TypeScript
* TypeOrm

## Setup

1- We need a Postgresql database (if you don't have it click : [Here](https://www.postgresql.org/download/))

2- Please Follow / Edit the 'src/config/database.ts' folder.

3- Now we are ready for the next steps:

* Clone this repo

  ```bash
  git clone <https://github.com/ALAATARAB/magic-movers.git>
  ```

* Install dependencies and Run

  ```bash
    # installing dependencies
    npm install

    # development
    npm start

    # watch mode
    npm run start:dev
  ```

## API Endpoints

### Magic Items Endpoints

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/v1/magic-items | To create a new magic item **(required)** |
| GET | /api/v1/magic-items | To get all the magic items |
| GET | /api/v1/magic-items/:itemId | To get a specific item |
| PATCH | /api/v1/magic-items/:itemId | To edit a specific item |
| DELETE | /api/v1/magic-items/:itemId | To delete a specific item |

### Magic Movers Endpoints

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/v1/magic-movers | To create a new magic mover **(required)** |
| POST | /api/v1/magic-movers/load/:moverId | To load some items into the mover **(required)** |
| GET | /api/v1/magic-movers | To get all the magic movers |
| GET | /api/v1/magic-movers/:moverId | To get all the information about the magic movers |
| GET | /api/v1/magic-movers/most-active | To get all the magic movers sorted by who completed the most missions (DESC) **(required)** |
| PATCH | /api/v1/magic-movers/start-a-mission/:moverId | To start a new mission for a magic mover **(required)** |
| PATCH | /api/v1/magic-movers/end-a-mission/:moverId | To end the mission for a magic mover **(required)** |
| PATCH | /api/v1/magic-movers/resting/:moverId | To put a magic mover in the resting state **(required)** |
| PATCH | /api/v1/magic-movers/unload/:moverId | To unload all the items from the magic mover **(required)** |
| DELETE | /api/v1/magic-movers/:moverId | To delete a magic mover |

### Mission Endpoints

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /api/v1/missions | To get all the missions |
| GET | /api/v1/missions/:missionId | To get all information about a mission |
| GET | /api/v1/missions/items/:missionId | To get the items which were in that mission |
| DELETE | /api/v1/missions/:missionId | To delete a mission |
