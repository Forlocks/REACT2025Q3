export async function getShips(key: string, page: number) {
  const PAGE_SIZE: number = 15;
  const API_URL: string = 'https://stapi.co/api/v1/rest/spacecraft/search';

  const queryOptions = `?pageNumber=${page}&pageSize=${PAGE_SIZE}`;
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

    return {
        spacecrafts: data.spacecrafts,
        totalPages: data.page.totalPages,
    };
  } catch {
    return null;
  }
}
