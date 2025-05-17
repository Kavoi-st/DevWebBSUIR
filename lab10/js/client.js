$(document).ready(function() {
    // Обработка формы на главной странице
    $('#namesForm').on('submit', function(e) {
        e.preventDefault();
        const names = $('#namesInput').val().split('\n').filter(name => name.trim());
        
        if (names.length === 0) {
            alert('Пожалуйста, введите хотя бы одно имя');
            return;
        }
        
        $.post('/process', { names: names.join('\n') }, function(response) {
            if (response.success) {
                // Показываем оригинальные имена
                displayNames('#originalNames', names);
                $('#originalList').removeClass('hidden');
                
                // Показываем кнопку перехода к результатам
                $('#resultLink').removeClass('hidden');
            }
        });
    });
    
    // Загрузка данных на странице результатов
    if (window.location.pathname === '/result') {
        $.get('/data', function(data) {
            displayNames('#originalNames', data.original);
            displayNames('#processedNames', data.processed);
        });
    }
    
    // Функция для отображения списка имен
    function displayNames(selector, names) {
        const $list = $(selector).empty();
        names.forEach(name => {
            if (name.trim()) {
                $list.append($('<li>').text(name));
            }
        });
    }
});