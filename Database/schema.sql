
CREATE TABLE scenarios(
   scenario_ID SERIAL PRIMARY KEY NOT NULL,
   scenario_name TEXT NOT NULL,
   opening_text TEXT NOT NULL
);
CREATE TABLE pages(
   page_ID SERIAL PRIMARY KEY NOT NULL,
   page_number int NOT NULL,
   page_text TEXT NOT NULL,
   scenario_name TEXT
);
git add .
git commit -m 'new commit'
git push
git push heroku main
