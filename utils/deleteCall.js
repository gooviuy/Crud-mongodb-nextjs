export const deleteData = async (id) => {
  try {
    await fetch(`/api/movie/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.loog(err);
  }
};
