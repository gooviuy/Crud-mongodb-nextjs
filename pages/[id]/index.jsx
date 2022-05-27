import dbConnect from "../../lib/dbConnect";
import Movie from "../../models/Movie";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MoviePage({ movie, success, error }) {
  const router = useRouter();

  const handeClick = () => {
    if (movie._id) {
      deleteData(movie._id);
      router.push("/");
    }
  };

  return (
    <div>
      <div>
        {!success ? (
          <div className="container text-center my-5">
            <h1>{error}</h1>
            <Link href="/">
              <a className="btn btn-success">Go back !..</a>
            </Link>
          </div>
        ) : (
          <div className="container">
            <h1>Movie Detail</h1>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5 className="text-uppercase">{movie.title} </h5>
                </div>
                <p className="fw-light">{movie.plot} </p>
                <Link href="/">
                  <a className="btn btn-success btn-sm me-2">Go back !..</a>
                </Link>
                <Link href={`${movie._id}/edit`}>
                  <a className="btn btn-warning btn-sm me-2">Edit !..</a>
                </Link>
                <button className="btn btn-danger btn-sm" onClick={handeClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();
    //beneficios para que la carga que hace mongoose sea mas liviana : lean()
    const movie = await Movie.findById(params.id).lean();
    movie._id = movie._id.toString();

    if (!movie) {
      return { props: { success: false, error: "Film not found !" } };
    }
    return { props: { success: true, movie } };
  } catch (err) {
    if (err.kind === "ObjectId") {
      return { props: { success: false, error: "Invalid id!" } };
    }
    return { props: { success: false, error: "Server error!" } };
  }
}
