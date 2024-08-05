// Урок 3. Сетевые запросы
// Цель: Разработать веб - приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб - сайт Unsplash(https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash(https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении(можете использовать http://localhost для тестирования).
// • Получите свой API - ключ после создания приложения.

// Разработка веб - приложения:

// • Создайте HTML - страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API - ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка".Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.

// * Дополнительные задачи(по желанию):
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
// • Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.

const getApi = '0Dm5o7toQ0dFQMBAStStjaCiEVc3pXPEwd5Ul4NPylo';
const checkApi = async () => {
    const responce = await fetch(`https://api.unsplash.com/photos/random/?client_id=${getApi}`);
    const getData = await responce.json();
    if (!responce.ok) {
        throw new Error('object not found');
    }
    return getData;
};

async function getPhoto() {
    const getData = await checkApi();
    console.log(getData);
    getRandomPhoto(getData);
    likePhoto(getData);
}
getPhoto();

const viewPhotoEl = document.querySelector('.viewPhoto');
let upCountLike = 0;

function getRandomPhoto(data) {
    localStorage.setItem('prev', data.urls.full);
    viewPhotoEl.insertAdjacentHTML("beforeend", `
        <div class="container">
            <div class="contentPhoto"><img class="photo" src="${data.urls.full}" alt="${data.alt_description}"></div>
            <div class="contentLike">
                <div class="like"><img id="like" src="./img/like.svg" alt="like"></div>
                <div class="viewlike">${data.likes}</div>
                <div class="like"><img id="dislike" src="./img/dislike.svg" alt="dislike"></div>
            </div>
            <div class="contentName">Автор: ${data.user.first_name}</div>
        </div>
    `)
}

function likePhoto(data) {
    upCountLike = data.likes;
    const likeEl = document.getElementById('like');
    const dislikeEl = document.getElementById('dislike');
    const viewlikeEl = document.querySelector('.viewlike');

    likeEl.addEventListener('click', function (e) {
        upCountLike++;
        viewlikeEl.textContent = upCountLike;
    });
    dislikeEl.addEventListener('click', function (e) {
        upCountLike--;
        viewlikeEl.textContent = upCountLike;
    });
}