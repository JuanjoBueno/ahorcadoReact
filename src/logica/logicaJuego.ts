export function ocultarWord(word: string): string {
  return word.replace(/./g, ' _ ');
}

export function ahoracado(word: string): string {
  const palabra = quitarAcentos(word);
  return palabra;
}

export function quitarAcentos(texto: string): string {
  return texto
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'ñ');
}
