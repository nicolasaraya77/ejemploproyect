const app = require("./app");
app.set("port", process.env.PORT || 4000);
// iniciar servidor
app.listen(5000, () => {
  console.log("server on port ", 5000);
  console.log("y ke paza");
});
