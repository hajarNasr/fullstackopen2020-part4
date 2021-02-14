const error404 = (request, response) => {
  response.status(404).send({ error: "404 page not found" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  error404,
  errorHandler,
};
