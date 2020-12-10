# pickmymeal

Pickmymeal is a website built on a MEAN stack to help you and your friends decide what you will be having to eat.

It features a personal list of foods you like, and a community list of foods curated by the admins.

A local instance can be spun up using docker compose. This relies on local node_modules directories, so npm install must be performed in
the express_server and pickmymeal_frontend directories before running.

Then use
```
docker-compose up --build
```
to create the local instance.
