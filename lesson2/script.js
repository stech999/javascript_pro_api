// Урок 2. События, формы
// Вашей задачей является создание веб - слайдера для отображения изображений на веб - странице.Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.

// 1. Создайте интерфейс веб - страницы, который включает в себя следующие элементы:

// a.Контейнер для отображения текущего изображения.
//     b.Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
//         c.Навигационные точки(индикаторы) для быстрого переключения между изображениями.

// 2. Используйте HTML для создания элементов интерфейса.

// 3. Используйте JavaScript для обработки событий:

// a.При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
//     b.При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
//         c.При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// 4. Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// 5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

const dataImg = './dbImg.json';

async function fetchImg(data) {
    try {
        const response = await fetch(data);
        const getData = await response.json();
        return getData;
    } catch (error) {
        console.log(error.message);
    }
}

function getImg(data) {
    const containerEl = document.querySelector('.container');
    const leftEl = document.querySelector('.left');
    const rightEl = document.querySelector('.right');
    const carousel1EL = document.getElementById('carousel-item-1');
    const carousel2EL = document.getElementById('carousel-item-2');
    const carousel3EL = document.getElementById('carousel-item-3');
    const logoImgEl = document.querySelector('.logoImg');
    const maxEl = Object.keys(data).length - 1;
    let count = 0;
    let img = new Image();
    img.style.width = '750px';
    img.style.height = '400px';

    leftEl.addEventListener('click', function () {
        if (count > 0) {
            count--;
            img.src = data[count].img;
        }
        else {
            count = maxEl;
            img.src = data[count].img;
        }
        logoImgEl.style.display = 'none';
    });

    rightEl.addEventListener('click', function () {
        if (count < maxEl) {
            count++;
            img.src = data[count].img;
        }
        else {
            count = 0;
            img.src = data[count].img;
        }
        logoImgEl.style.display = 'none';
    });

    carousel1EL.addEventListener('click', function () {
        if (count > 0) {
            count--;
            img.src = data[count].img;
            count++;
        }
        else {
            count = maxEl;
            img.src = data[count].img;
            count--;
        }
        logoImgEl.style.display = 'none';
    });

    carousel2EL.addEventListener('click', function () {
        if (count === maxEl) {

        }
        img.src = data[count].img;
        console.log(`centr ${count}`);
        logoImgEl.style.display = 'none';
    });

    carousel3EL.addEventListener('click', function () {
        if (count < maxEl) {
            count++;
            img.src = data[count].img;
            console.log(`right ${count}`);
            count--;
        }
        else {
            count = 0;
            img.src = data[count].img;

        }
        logoImgEl.style.display = 'none';
    });
    containerEl.appendChild(img);
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const getDB = await fetchImg(dataImg);
        getImg(getDB);
    } catch (error) {
        console.error('Ошибка при загрузке контента:', error);
    }
});



