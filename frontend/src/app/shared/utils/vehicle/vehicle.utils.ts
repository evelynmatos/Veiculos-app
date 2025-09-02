export function formatVehicleData(data: any) {
  const capitalizeFirstLetter = (text: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';

  return {
    ...data,
    placa: data.placa ? data.placa.toUpperCase() : '',
    modelo: capitalizeFirstLetter(data.modelo),
    marca: capitalizeFirstLetter(data.marca)
  };
}