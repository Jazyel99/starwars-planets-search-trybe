import PlanentEdpoint from './endpoints/endpoint';

const getPlanetsAPI = async () => {
  const request = await fetch(PlanentEdpoint.planets);
  const response = await request.json();
  return response;
};

export default getPlanetsAPI;
