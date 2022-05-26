import { Form } from "../components/Form";

export default function NewMovie() {
  const formData = {
    title: "",
    plot: "",
  };

  return (
    <div className="container">
      <h1 className="my-3">Add a new movie !</h1>
      <Form formData={formData} />
    </div>
  );
}
