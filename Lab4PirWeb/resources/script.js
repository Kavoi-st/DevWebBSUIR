document.addEventListener('DOMContentLoaded', () => {
    updateResults();
    

    document.getElementById('carForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (saveData()) {
            this.reset();
            alert('Данные успешно сохранены!');
            updateResults();
        }
    });

    const powerRange = document.querySelector('input[type="range"]');
    if (powerRange) {
        powerRange.addEventListener('input', function() {
            document.getElementById('powerValue').textContent = this.value;
        });
    }
});


function saveData() {
    const form = document.getElementById('carForm');
    let isValid = true;

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.checkValidity()) {
            field.reportValidity();
            isValid = false;
        }
    });

    if (!isValid) return false;

    
    const formData = {
        name: form.querySelector('input[type="text"]').value.trim(),
        email: form.querySelector('input[type="email"]').value.trim(),
        power: form.querySelector('input[type="range"]').value,
        options: Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value),
        transmission: form.querySelector('input[type="radio"]:checked')?.value || 'не указано',
        body: form.querySelector('select').value,
        budget: form.querySelector('input[type="number"]').value
    };

    let clients = JSON.parse(localStorage.getItem('clients') || '[]');
    clients.push(formData);
    localStorage.setItem('clients', JSON.stringify(clients));

    return true;
}
function saveAndShow() {
    updateResults();
    document.getElementById('modal').style.display = 'flex';
}

function updateResults() {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = '';

    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name || 'Не указано'}</td>
            <td>${client.email || 'Не указано'}</td>
            <td>${client.power} л.с.</td>
            <td>${client.options.join(', ') || '-'}</td>
            <td>${client.transmission === 'auto' ? 'Автомат' : 
                 client.transmission === 'manual' ? 'Механика' : 
                 'Не указано'}</td>
            <td>${client.body === 'sedan' ? 'Седан' : 
                 client.body === 'suv' ? 'Внедорожник' : 
                 'Не указано'}</td>
            <td>$${client.budget || '0'}</td>
        `;
        tbody.appendChild(row);
    });
}


window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};