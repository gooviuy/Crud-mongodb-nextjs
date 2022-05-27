//Creamos el metodo para obtener la informacion al editar una movie.
import dbConnect from "../../../lib/dbConnect";
import Movie from "../../../models/Movie";

export default async function handler(req, res) {
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const movie = await Movie.findById(id).lean();
        if (!movie) {
          res.status(401).json({ success: false });
        }
        return res.json({ success: true, data: movie });
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, error: "Server has faild" });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Server has faild" });
  }
}
