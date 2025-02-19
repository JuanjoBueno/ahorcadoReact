export function quitarAcentos(texto: string): string {
  return texto
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'ñ');
}

export function logicaJuego(word: string) {
  quitarAcentos(word);
}

export function mostrarWord(texto: string, letrasUsadas: string[]): string {
  return texto
    .split('')
    .map(letra => (letrasUsadas.includes(letra) ? ` ${letra} ` : ' _ '))
    .join('')
    .trim();
}
