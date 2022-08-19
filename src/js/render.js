const divForGallery = document.querySelector('.gallery');

export function render(name) {
  const content = name.reduce(
    (
      acc,
      { largeImageURL, webformatURL, likes, views, comments, downloads }
    ) => {
      return (
        acc +
        `<div class="photo-card">
                        <a href="${largeImageURL}">
                            <img class="img" src="${webformatURL}" height="400" loading="lazy"/>
                        </a>
                        <div class="info">
                            <p class="info-item">
                                <b>Likes</b>
                                <span>${likes}</span>
                            </p>
                            <p class="info-item">
                                <b>Views</b>
                                <span>${views}</span>
                            </p>
                            <p class="info-item">
                              <b>Comments</b>
                              <span>${comments}</span>
                            </p>
                            <p class="info-item">
                              <b>Downloads</b>
                              <span>${downloads}</span>
                            </p>
                        </div>
                    </div>`
      );
    },
    ''
  );
  divForGallery.insertAdjacentHTML('beforeend', content);
}
