export function processNames(names) {
    // Делаем первую букву заглавной
    const correctedNames = names.map(name => {
        if (name.length === 0) return name;
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });
    
    // Сортируем по алфавиту
    const sortedNames = [...correctedNames].sort((a, b) => a.localeCompare(b));
    
    return {
        original: names,
        corrected: correctedNames,
        sorted: sortedNames
    };
}