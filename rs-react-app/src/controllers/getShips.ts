export async function getShips(key: string) {
  const PAGE_NUMBER: number = 0;
  const PAGE_SIZE: number = 15;
  const API_URL: string = `https://stapi.co/api/v1/rest/spacecraft/search`;

  const queryOptions = `?pageNumber=${PAGE_NUMBER}&pageSize=${PAGE_SIZE}`;
  const requestBody: string = `name=${encodeURIComponent(key)}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  };

  localStorage.setItem('STS last request', key);

  try {
    const response = await fetch(`${API_URL}${queryOptions}`, requestOptions);
    const data = await response.json();

    return data.spacecrafts;
  } catch {
    return null;
  }
}
