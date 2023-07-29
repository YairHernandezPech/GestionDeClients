export function createSearchItem(value: any): any {
    const item = {};
    if (value) {
      item['$or'] = [
        { name: value },
        { customerType: value },
        { createdAT: value },
      ];
    }
    return item;
  }