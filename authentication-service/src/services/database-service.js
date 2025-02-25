import { authDb } from '../database/connection.js';

export const createUser = async (email, displayName, password) => {
  return await authDb('users').insert({ 
    email, 
    displayName, 
    password 
  }).returning('*');
};

export const getUserByEmail = async (email) => {
  return await authDb('users')
    .where({ email })
    .first();
};

export const getUserById = async (id) => {
  return await authDb('users')
  .where({ id: id })
  .first();
};

export const getUserByDisplayName = async (displayName) => {
  return await authDb('users')
    .where({ displayName })
    .first();
};