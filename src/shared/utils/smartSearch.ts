import Fuse, { IFuseOptions } from 'fuse.js';

interface SearchObject {
  [key: string]: any; // Определяет объект с произвольными ключами
}

export function smartSearch<T extends SearchObject>(
    searchString: string,
    fields: Array<keyof T>,
    objects: T[]
  ): T[] {
    // Настройки для Fuse.js
    const options: IFuseOptions<T> = {
      keys: fields as string[], // Преобразуем поля для поиска в массив строк
      includeScore: true, // Включает оценку соответствия (для сортировки результатов)
      threshold: 0.4, // Порог для нечеткого поиска (0 - точное совпадение, 1 - максимально неточное)
      distance: 100, // Максимальное расстояние для неточного поиска
    };
  
    // Создаем экземпляр Fuse с массивом объектов и настройками
    const fuse = new Fuse(objects, options);
  
    // Выполняем поиск по строке
    const result = fuse.search(searchString);
  
    // Возвращаем найденные элементы (только объекты, можно также вернуть оценки)
    return result.map(res => res.item);
  }