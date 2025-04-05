document.addEventListener('DOMContentLoaded', function() {
    const imageSelector = document.getElementById('imageSelector');
    const imageContainer = document.getElementById('imageContainer');
    const textInput = document.getElementById('textInput');
    const addToListButton = document.getElementById('addToListButton');

    const images = [
        '', 
        '../resource/img1.jpg',
        '../resource/img2.jpg',
        '../resource/img3.jpg',
        '../resource/img4.jpg',
        '../resource/img5.jpg'
    ];


    const defaultImage = '../resource/default.jpg';

   
    addToListButton.addEventListener('click', function() {
        const text = textInput.value.trim();
        if (text) {
            const newOption = document.createElement('option');
            newOption.value = images.length; 
            newOption.text = text;
            imageSelector.insertBefore(newOption, imageSelector.firstChild.nextSibling); 
            textInput.value = ''; 
            images.push(defaultImage);
        }
    });

    showAllImagesButton.addEventListener('click', function() {
        const selectedIndex = imageSelector.value;
        if (selectedIndex > 0) {
            const newWindow = window.open('', '_blank');
            newWindow.document.write('<html><head><title>Все картинки</title><style>img { display: block; margin: 10px auto; }</style></head><body>');
            
            newWindow.document.write(`<img src="${images[selectedIndex]}" alt="Выбранная картинка" style="width:500px;height:auto;">`);
            
            images.forEach((img, index) => {
                if (index > 0 && index != selectedIndex) {
                    newWindow.document.write(`<img src="${img}" alt="Картинка ${index}" style="width:500px;height:auto;">`);
                }
            });

            newWindow.document.write('</body></html>');
            newWindow.document.close();
        } else {
            alert('Пожалуйста, выберите картинку из списка.');
        }
    });

    imageSelector.addEventListener('change', function() {
        const selectedIndex = this.value;
        if (selectedIndex > 0 && selectedIndex < images.length) {
            const imgElement = document.createElement('img');
            imgElement.src = images[selectedIndex];
            imgElement.alt = 'Выбранная картинка';
            imageContainer.innerHTML = ''; 
            imageContainer.appendChild(imgElement);
        } else if (selectedIndex >= images.length) {
            const imgElement = document.createElement('img');
            imgElement.src = defaultImage; 
            imgElement.alt = 'Картинка по умолчанию';
            imageContainer.innerHTML = ''; 
            imageContainer.appendChild(imgElement);
        } else {
            imageContainer.innerHTML = '';
        }
    });
});