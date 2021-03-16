
CREATE TABLE scenarios(
   scenario_ID SERIAL PRIMARY KEY NOT NULL,
   scenario_name TEXT NOT NULL,
   opening_text TEXT NOT NULL
);
CREATE TABLE pages(
   page_ID SERIAL PRIMARY KEY NOT NULL,
   page_name TEXT NOT NULL,
   page_text TEXT NOT NULL,
   scenario_ID int
);
