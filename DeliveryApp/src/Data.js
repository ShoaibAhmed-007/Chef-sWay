const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const cards = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/displayData`);
    const final = await res.json();

    return final;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
