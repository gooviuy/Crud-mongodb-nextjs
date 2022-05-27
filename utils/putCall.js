export const putData = async (form, router) => {
  const { id } = router;
  try {
    const res = await fetch(`/api/movie/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success == false) {
      setError(true);
    } else if (data.success == true) {
    }
    return {
      data,
    };
  } catch (err) {
    console.log(SyntaxError);
  }
};
