import axios from 'axios';

export async function getter(numberOfPage, request) {
  const answer = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '29360709-e61ed8eebe570e88773d53140',
      q: `${request}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: numberOfPage,
    },
  });
  return answer.data;
}
