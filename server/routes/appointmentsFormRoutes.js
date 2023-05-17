/**
 * Routes files for appointments entity
 * @author Kevin Isaza Arias
 */

class AppointmentsFormRoutes{
    #app;
         #databaseHelper = require("../framework/utils/databaseHelper");
        #httpErrorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#createAppointment();
    }
    #createAppointment(){
      this.#app.post("/appointments",async(req, res)=>{
          try{
             const data = await this.#databaseHelper.handleQuery({
                 query: "   INSERT INTO appointment(name,email,date)VALUES(?,?,?)",
                  values:[req.body.name, req.body.email, req.body.date ]
              });

             if(data.insertId){
                 res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.insertId});
             }
          }catch (e){

              res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});


          }
    });
        // dit is voor de tag

    }
}
module.exports = AppointmentsFormRoutes;