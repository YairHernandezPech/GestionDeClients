export function searchValues(valor: any): any {
  const value = {};
  if (valor) {
    value['$and'] = [{ clientName: valor }, { status: valor }];
  }
  return value;
}
