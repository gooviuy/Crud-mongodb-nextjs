import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { postCall } from "../utils/postCall";

//forNewMovie activa el post data
export const Form = ({ formData, forNewMovie = true }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: formData.title,
    plot: formData.plot,
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const putData = async (form) => {
    const { id } = router.query;
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
        router.push("/");
      }
      return {
        data,
      };
    } catch (err) {
      console.log(SyntaxError);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postCall(form);
    } else {
      //editar data
      putData(form);
    }

    setForm({
      title: "",
      plot: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Plot"
          name="plot"
          value={form.plot}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-50" type="submit">
          {forNewMovie ? "Add a movie" : "Edite the movie"}
        </button>
        <Link href="/">
          <a className="btn btn-warning w-50 ">Go back !</a>
        </Link>
        {error ? <h2>We couldnt added it !</h2> : null}
      </form>
    </div>
  );
};
