import { processNames } from './namesModule.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM загружен");
  
  const originalNamesContainer = document.getElementById('originalNames');
  const processedNamesContainer = document.getElementById('processedNames');
  const processBtn = document.getElementById('processBtn');

  console.log("Элементы:", {
    originalNamesContainer,
    processedNamesContainer,
    processBtn
  });

  // Исходный массив имен с ошибками
  const names = [
    'анна',
    'пётр', 
    'мария',
    'иван',
    'светлана',
    'alexander',
    'наталья',
    'сергей',
    'ольга',
    'дмитрий'
  ];

  // Отображаем исходные имена
  displayNames(originalNamesContainer, names, "Исходный список имен:");
  
  processBtn.addEventListener('click', () => {
    console.log("Кнопка нажата - начинаю обработку");
    
    // Обрабатываем имена
    const result = processNames(names);
    console.log("Результат обработки:", result);
    
    // Отображаем обработанные имена
    displayNames(processedNamesContainer, result.sorted, "Обработанный список:");
    processedNamesContainer.classList.remove('hidden');
    console.log("Обработанные имена отображены");
    
    // Скрываем кнопку
    processBtn.classList.add('hidden');
  });

  function displayNames(container, namesList, title) {
    console.log(`Отображаю ${namesList.length} имен в контейнере`);
    container.innerHTML = `<h3>${title}</h3>`;
    namesList.forEach(name => {
      const nameElement = document.createElement('div');
      nameElement.className = 'name-item';
      nameElement.textContent = name;
      container.appendChild(nameElement);
    });
  }
});