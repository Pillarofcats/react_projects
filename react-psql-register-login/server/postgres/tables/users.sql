/*starting point of an explicit, local transaction*/
BEGIN TRANSACTION;

CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  joined DATE NOT NULL,
  pass VARCHAR(100) NOT NULL,
  num_login INT DEFAULT 0
);

/*end of a successful implicit or explicit transaction*/
COMMIT;