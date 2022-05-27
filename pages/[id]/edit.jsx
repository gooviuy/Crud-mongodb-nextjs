import useSWR from "swr";
import { fetcher } from "../../utils/getCall";
import { useRouter } from "next/dist/client/router";
import { Form } from "../../components/Form";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  //realizando fetch a la api :
  const { data: movie, error } = useSWR(
    id ? `/api/movie/${id}` : null,
    fetcher
  );

  if (error) {
    return <div>Error</div>;
  }

  if (!movie) {
    return (
      <div className="container mt-5 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }
  const formData = {
    title: "",
    plot: "",
  };

  return (
    <div className="container">
      <h1 className="my-3">Edit a movie !</h1>
      <Form forNewMovie={false} formData={formData}></Form>
    </div>
  );
}
