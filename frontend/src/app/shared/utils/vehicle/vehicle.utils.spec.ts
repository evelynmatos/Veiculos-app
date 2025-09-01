import { formatVehicleData } from './vehicle.utils';

describe('formatVehicle', () => {
  it('deve formatar placa em maiúsculas e modelo/marca com inicial maiúscula', () => {
    const input = {
      placa: 'abc1234',
      modelo: 'gol',
      marca: 'volkswagen',
      ano: 2020,
      chassi: '12345678901234567',
      renavam: '12345678901'
    };

    const result = formatVehicleData(input);

    expect(result.placa).toBe('ABC1234');
    expect(result.modelo).toBe('Gol');
    expect(result.marca).toBe('Volkswagen');
    expect(result.ano).toBe(2020); // permanece o mesmo
  });

  it('deve lidar com campos ausentes sem erro', () => {
    const input = {
      placa: '',
      modelo: '',
      marca: '',
      ano: 2020,
      chassi: '',
      renavam: ''
    };

    const result = formatVehicleData(input);

    expect(result.placa).toBe('');
    expect(result.modelo).toBe('');
    expect(result.marca).toBe('');
  });
});
