#FROM (image:version)
FROM postgres:12.4
#ADD (source) (destination in container)
ADD ./tables/ /docker-entrypoint-initdb.d/tables/
#ADD (source) (destination in container)
ADD ./deploy_schema.sql /docker-entrypoint-initdb.d/