import { UsersDocument } from 'src/users/model/Users';

export function orderUser(users: UsersDocument[]): UsersDocument[] {
  const orderUsers = users.sort((a, b) => {
    // Ordenar por nombre
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0; // Retornar 0 en caso de que los nombres sean iguales
  });
  return orderUsers;
}
