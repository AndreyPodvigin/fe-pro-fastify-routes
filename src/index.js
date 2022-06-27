import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));


fastify.post('/uppercase', (request, reply) => {
  const string = request.body.toUpperCase();
  if (string.includes('FUCK')) {
    return reply.status(403).send('unresolved')
  } else {
    return reply.status(200).send(string);
  }
});

fastify.post('/lowercase', (request, reply) => {
  const string = request.body.toLowerCase();
  if (string.includes('fuck')) {
    return reply.status(403).send('unresolved')
  } else {
    return reply.status(200).send(string);
  }
});

fastify.get('/user/:id', (request, reply) => {
  const userID = users[request.params.id];
  if (userID) {
    return reply.status(200).send(userID);
  } else {
    return reply.status(400).send('User not exist');
  }
})

fastify.get('/users', (request, reply) => {
  const usersArray = Object.values(users);
  let { filter, value } = request.query;
  if (filter === undefined || value === undefined) {
    return reply.status(200).send(usersArray);
  } else {
    const filteredUsers = usersArray.filter((item) => {
      if (item[filter].toString() === value) {
        return item;
      }
    }
    );
    return reply.status(200).send(filteredUsers);
  }

})

export default fastify;
