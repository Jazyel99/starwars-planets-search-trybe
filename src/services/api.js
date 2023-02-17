const API_URL = 'https://swapi.dev/api/planets';

const getPlanetsAPI = async () => {
  const request = await fetch(API_URL);
  const response = await request.json();
  return response;
};

export default getPlanetsAPI;
