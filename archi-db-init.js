// archi-db-init.js

db.createUser({
    user: 'jerem',
    pwd: 'not24get',
    roles: [
      {
        role: 'readWrite',
        db: 'archi_db',
      },
    ],
  });
  
  db.createCollection('docs');
  