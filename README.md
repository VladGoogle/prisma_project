Diploma Project:

Run a project:

1.docker-compose up --build
2. After server is started, run "npx prisma migrate dev --name init"
to synchronize with database"

If you want to clear database, run firstly "docker rm -f $(docker ps -a -q)", after that, run "docker volume rm $(docker volume ls -q)"
 
