ALTER TABLE talks ADD PRIMARY KEY (id);

create table ratings (id serial PRIMARY KEY, rating integer, comment text, talkId integer REFERENCES talks (id));
