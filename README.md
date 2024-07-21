# Ajirni.com

## Problem

### Many times, we need a certain item for a specific task, but we don't have that item and we only need it this one time! On the other hand, we often buy things that we rarely use

## Solution

### And that's where the idea came from, We can now link between the owner of the item and the one in need of it. On one hand, the owners can now earn income by renting out their items, and on the other hand, the renter can rent the item without wasting money on purchasing a new one

## Used Technologies

- NestJs
- TypeORM
- TS
- Nodemailer

Make sure to preview the project : [here](https://www.linkedin.com/feed/update/urn:li:activity:7187007107991314432/)

<<<<<<< HEAD
### *Note : This project is from my participation in the Ramadan Hackathon by [Arab American Society](https://www.aased.org/)*
=======
1- We need a Postgresql database (if you don't have it click : [Here](https://www.postgresql.org/download/))

2- Please (Follow / Edit) the **'src/config/database.ts'** file.

3- Now we are ready for the next steps:

* Clone this repo

  ```bash
  git clone https://github.com/ALAATARAB/magic-transporters.git
  ```

* Install dependencies and Run

  ```bash
    # installing dependencies
    npm install
  ```
  
  ```bash
    # development
    npm start
  ```

  ```bash
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
>>>>>>> 2d11adb532e0a392d3772993494eb2620ff6ea4b
