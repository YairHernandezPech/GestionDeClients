export function orderClient(clients: any[]): any[] {
    const orderClients = clients.sort((a, b) => {
      // Ordenar por nombre
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
  
      // Si los nombres son iguales, ordenar por fecha
      if (a.createdAT < b.createdAT) return -1;
      if (a.createdAT > b.createdAT) return 1;
  
      return 0;
    });
  
    return orderClients;
  }
  