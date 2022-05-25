// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../lib/dbConnect";
import Movie from "../../models/Movie";

export default async function handler(req, res) {
  // POST api/movie
  await dbConnect();

  //preguntamos por los metodos que el cliente solicita :
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const movie = new Movie(req.body);
        await movie.save(); //lo guarda en la base de datos

        return res.status(200).json({ success: true, movie });
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
