CREATE TABLE posts
(
    id SERIAL NOT NULL,
    title character varying(128) NOT NULL,
    content text NOT NULL,
    category character varying(60) NOT NULL,
    tags character varying(60)[] NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (id)
)