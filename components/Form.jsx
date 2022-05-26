import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postData(form);
    } else {
      //editar data
    }

    setForm({
      title: "",
      plot: "",
    });
  };

  const postData = async (form) => {
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
          Add !
        </button>
        <Link href="/">
          <a className="btn btn-warning w-50 ">Go back !</a>
        </Link>
        {error ? <h2>We couldnt added it !</h2> : null}
      </form>
    </div>
  );
};