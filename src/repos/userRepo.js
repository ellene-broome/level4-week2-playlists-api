// src/repos/userRepo.js
import crypto from "node:crypto";

const users = [];

export function createUser({ email, passwordHash }) {
  const user = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
  };

  users.push(user);
  return user;
}

export function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

export function findUserById(id) {
  return users.find((u) => u.id === id);
}