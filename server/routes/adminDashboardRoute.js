/**
 * Routes file for adminDashboard entity
 * @author Chant Balci
 */

class adminDashboardRoute{
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#saveTestlesson();
    }
    #saveTestlesson(){
        this.#app.get("/adminDashboards", async(req, res) =>{
            try{
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO testlesson (name, timeDuration, date, location, room, subject) VALUES(?,?,?,?,?,?)",
                    values:[req.body.name, req.body.timeDuration, req.body.date, req.body.location, req.body.room, req.body.subject]
                });
                if(data.insertId){
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.insertId});
                }
            }catch (e){
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}
module.exports = adminDashboardRoute;