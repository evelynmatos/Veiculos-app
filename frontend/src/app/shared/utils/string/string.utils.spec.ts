import { removeSpaces } from "./string.utils";

describe('removeSpaces', () => {
  it('deve remover todos os espaços em branco de uma string', () => {
    expect(removeSpaces('a b c')).toBe('abc');
    expect(removeSpaces('   teste   ')).toBe('teste');
    expect(removeSpaces('com espaços no meio')).toBe('comespaçosnomeio');
  });

  it('deve retornar string vazia se receber undefined', () => {
    expect(removeSpaces(undefined as any)).toBe('');
  });

  it('deve retornar string vazia se receber null', () => {
    expect(removeSpaces(null as any)).toBe('');
  });

  it('deve retornar a string original se não houver espaços', () => {
    expect(removeSpaces('semEspacos')).toBe('semEspacos');
  });
});
