CREATE TABLE user_table (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    password VARCHAR,
    pp VARCHAR,
    bio VARCHAR,
    registration_date TIMESTAMP
);

CREATE TABLE story_table (
	id SERIAL PRIMARY KEY,
    title VARCHAR,
    author_id INT,
  	description TEXT,
    genre VARCHAR,
    cover_image VARCHAR,
    creation_date TIMESTAMP,
    last_updated_date TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES user_table(id)
);

CREATE TABLE chapter_table (
	id SERIAL PRIMARY KEY,
  	story_id INT,
  	title VARCHAR,
  	content TEXT,
  	published_date TIMESTAMP,
  	chapter_number INT,
  	FOREIGN KEY (story_id) REFERENCES story_table(id)
);


CREATE TABLE comment_table(
	id SERIAL PRIMARY KEY,
  	user_id INT,
  	story_id INT,
  	chapter_id INT,
  	content TEXT,
  	published_date TIMESTAMP,
  	FOREIGN KEY (user_id) REFERENCES user_table(id),
   	FOREIGN KEY (story_id) REFERENCES story_table(id),
   	FOREIGN KEY (chapter_id) REFERENCES chapter_table(id)
);

CREATE TABLE like_table (
    id SERIAL PRIMARY KEY,
    user_id INT,
    story_id INT,
    FOREIGN KEY (user_id) REFERENCES user_table(id),
    FOREIGN KEY (story_id) REFERENCES story_table(id)
);

CREATE TABLE follower_table (
    id SERIAL PRIMARY KEY,
    follower_user_id INT,
    following_user_id INT,
    FOREIGN KEY (follower_user_id) REFERENCES user_table(id),
    FOREIGN KEY (following_user_id) REFERENCES user_table(id)
);

CREATE TABLE reading_list_table (
    id SERIAL PRIMARY KEY,
    user_id INT,
    list_name VARCHAR,
    FOREIGN KEY (user_id) REFERENCES user_table(id)
);

CREATE TABLE reading_list_stories (
    id SERIAL PRIMARY KEY,
    list_id INT,
    story_id INT,
    position INT,
    FOREIGN KEY (list_id) REFERENCES reading_list_table(id),
    FOREIGN KEY (story_id) REFERENCES story_table(id)
);