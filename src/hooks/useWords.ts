import {useEffect, useState} from 'react';
import {WordAdapter} from '../adapter/WordAdapter';
import {Word} from '../entities/Word';
import {HttpError} from '../adapter/http/HttpError';

export const useWords = () => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  const loadWord = async () => {
    try {
      const palabra = await WordAdapter.getWord();

      if (palabra instanceof HttpError) {
        console.error('Errores al obtener la palabra:');
        return;
      }

      setCurrentWord(palabra);
      console.log('Palabra obtenida:', palabra);
    } catch (error) {
      console.error('Error inesperado obteniendo la palabra:', error);
    }
  };

  useEffect(() => {
    loadWord();
  }, []);

  return {currentWord, loadWord};
};
