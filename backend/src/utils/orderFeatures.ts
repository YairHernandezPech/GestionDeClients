export function orderFeature(features: any[]): any[] {
  const orderFeatures = features.sort((a, b) => {
    // Ordenar por fecha
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;

    // Si las fechas son iguales, ordenar por estado (pendiente primero, pagado después)
    if (a.status === 'pendiente' && b.status === 'pagado') return -1;
    if (a.status === 'pagado' && b.status === 'pendiente') return 1;

    return 0;
  });

  return orderFeatures;
}
