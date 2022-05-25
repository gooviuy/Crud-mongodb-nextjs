import Link from "next/link";
import { useState } from "react";

export default function NewMovie() {
  const [form, setForm] = useState({
    title: "",
    plot: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(form);
  };

  const postData = async (form) => {
    try {
      console.log(form);
    } catch (err) {
      console.log(SyntaxError);
    }
  };

  return (
    <div className="container">
      <h1 className="my-3">Add a new movie !</h1>
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
        <Link href="">
          <a className="btn btn-warning w-50 ">Go back !</a>
        </Link>
      </form>
    </div>
  );
}
