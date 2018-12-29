## OSGE

A price lookup for items in oldschool runescape

## How to run

1. Using mongodb make a db called `osge` with a collection named `items`
2. In the items collection make a document with the fields `id` and `name`
3. This is the [link](https://pastebin.com/LhxJ7GRG) for all current items in oldschool runescape
4. Import the items into your db using this command `mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray` or by using mongodb compass
5. Run `yarn` or `npm i` for the backend and the frontend  
   That should be all to get the project up and running.

## Todo

Tests  
Better error handling  
Price trends (maybe graphs?)
