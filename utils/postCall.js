export const postCall = async (form) => {
  try {
    const res = await fetch("/api/movie", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success == false) {
      setError(true);
    } else if (data.success == true) {
      router.push("/");
    }
    return {
      data,
    };
  } catch (err) {
    console.log(SyntaxError);
  }
};
