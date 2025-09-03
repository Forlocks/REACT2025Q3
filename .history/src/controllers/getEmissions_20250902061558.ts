export async function getEmissions() {
  const DATA_PATH = './co2-data.json';

  try {
    const response = await fetch(DATA_PATH);

    if (!response.ok) {
      throw new Error(`Failed fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed fetch:", error);
    return null;
  }
}
