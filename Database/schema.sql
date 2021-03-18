DROP TABLE IF EXISTS scenarios
DROP TABLE IF EXISTS pages
DROP TABLE IF EXISTS actions


CREATE TABLE scenarios(
   scenario_ID SERIAL,
   scenario_name VARCHAR(255) NOT NULL UNIQUE,
   opening_text TEXT,
   PRIMARY KEY(scenario_ID)
);
CREATE TABLE pages(
   page_ID SERIAL,
   scenario_name VARCHAR(255),
   page_number INT,
   page_text TEXT,
   PRIMARY KEY(page_ID),
   CONSTRAINT fk_scenarios
      FOREIGN KEY(scenario_name)
         REFERENCES scenarios(scenario_name)
         ON DELETE CASCADE
);
CREATE TABLE actions(
   actions_ID SERIAL,
   page_ID INT,
   actions_text TEXT,
   page_number INT,
   scenario_name TEXT,
   to_page_number INT,
   PRIMARY KEY(actions_ID),
   CONSTRAINT fk_pages
      FOREIGN KEY(page_ID)
         REFERENCES pages(page_ID)
         ON DELETE CASCADE
);
git add .
git commit -m 'new commit'
git push
git push heroku main
