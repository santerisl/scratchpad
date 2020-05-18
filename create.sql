DROP TABLE IF EXISTS scratchpad;
DROP TABLE IF EXISTS item;

CREATE TABLE IF NOT EXISTS scratchpad (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT
);

CREATE TABLE IF NOT EXISTS item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sid TEXT NOT NULL,
    time INTEGER,
    content TEXT,
    FOREIGN KEY(sid)
        REFERENCES scratchpad(id)
        ON DELETE CASCADE
);

INSERT INTO scratchpad (id, name) VALUES ('1', 'Notes 1');
INSERT INTO scratchpad (id, name) VALUES ('2', 'Notes 2');

INSERT INTO item (sid, content) VALUES ('1', '1');
INSERT INTO item (sid, content) VALUES ('1', '2');
INSERT INTO item (sid, content) VALUES ('1', '3');

INSERT INTO item (sid, content) VALUES ('2', '1');
INSERT INTO item (sid, content) VALUES ('2', '2');
INSERT INTO item (sid, content) VALUES ('2', '3');
