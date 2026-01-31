CREATE USER IF NOT EXISTS 'ServiceNest'@'localhost' IDENTIFIED BY 'servicenest123';

GRANT ALL PRIVILEGES ON servicenest_mvp.* TO 'ServiceNest'@'localhost';

GRANT CREATE, ALTER, DROP, INDEX, REFERENCES, CREATE TEMPORARY TABLES
ON *.* TO 'ServiceNest'@'localhost';

FLUSH PRIVILEGES;