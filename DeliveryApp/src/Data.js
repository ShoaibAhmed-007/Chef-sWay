export const cards = async () => {
  try {
    const res = await fetch("https://chef-sway.onrender.com/api/displayData");
    const final = await res.json();

    return final;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
