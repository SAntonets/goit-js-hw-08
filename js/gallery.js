const images = [
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original: "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original: "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

// Функція для створення розмітки для всіх елементів галереї
function createGalleryMarkup(images) {
  return images.map(image => {
    return `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.original}" download>
          <img class="gallery-image" src="${image.preview}" data-source="${image.original}" alt="${image.description}">
        </a>
      </li>
    `;
  }).join('');
}

// Отримання посилання на ul.gallery
const galleryContainer = document.querySelector('ul.gallery');

// Вставка розмітки до DOM за одну операцію
galleryContainer.innerHTML = createGalleryMarkup(images);

// Заборона завантаження зображення при кліку на посиланні
galleryContainer.addEventListener('click', (event) => {
  event.preventDefault();

  // Перевіряємо, чи клікнуто на елементі галереї
  const galleryImage = event.target.closest('.gallery-image');
  if (galleryImage) {
    // Отримуємо посилання на велике зображення
    const largeImageSrc = galleryImage.getAttribute('data-source');

    // Отримуємо розмітку модального вікна та змінюємо значення атрибута src
    const lightboxContent = `<img src="${largeImageSrc}" alt="Large Image">`;
    
    // Ініціалізуємо модальне вікно та відображаємо зображення
    const lightbox = basicLightbox.create(lightboxContent);
    lightbox.show();

    // Додаємо обробник події для натискання клавіші Escape
    document.addEventListener('keydown', handleKeyPress);

    // Функція обробника для натискання клавіші Escape
    function handleKeyPress(event) {
      if (event.key === 'Escape') {
        // Закриваємо модальне вікно
        lightbox.close();
        
        // Видаляємо обробник події, оскільки модальне вікно більше не відкрите
        document.removeEventListener('keydown', handleKeyPress);
      }
    }
  }
});