class LandingpageRoute {

  #app;
  #databaseHelper = require("../framework/utils/databaseHelper.js");
  #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");


  constructor(app) {
    this.#app = app;

    this.#getSubject();

  }
  #getSubject (){
    this.#app.get("/landingpage", async (req,res) => {
      try {
        const subject = await this.#databaseHelper.handleQuery({
          query: "SELECT * FROM subject"
        })
        res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(subject);
      } catch (e) {
        console.log(e);
      }
    })

}
}

module.exports = LandingpageRoute;

