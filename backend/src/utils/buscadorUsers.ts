export function createSearch(valor: any, ignoreCase = true): any {
  const param = {};
  if (valor) {
    const regex = new RegExp(`^${valor}`, ignoreCase ? 'i' : '');
    param['$or'] = [
      { name: regex },
      { email: { $regex: `^${valor}$`, $options: 'i' } },
    ];
  }
  return param;
}
