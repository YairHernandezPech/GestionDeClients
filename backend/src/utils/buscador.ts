export function createSearchItem(valor: any): any {
    const item = {};
    if (valor) {
      item['$or'] = [
        { name: valor },
        { customerType: valor },
        { createdAT: valor },
      ];
    }
    return item;
  }