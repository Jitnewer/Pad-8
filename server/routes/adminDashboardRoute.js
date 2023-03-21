/**
 * Routes file for adminDashboard entity
 * @author Chant Balci
 */

class adminDashboardRoute{
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#saveTestlesson();
        // this.#addTestlesson();
    }
    #saveTestlesson(){
        this.#app.post("/adminDashboard", async(req, res) =>{
            try{
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO testlesson (name,Admin_idAdmin,timeDuration, date, location, room, subject) VALUES(?,1,?,?,?,?,?)",
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

//     #addTestlesson(){
// this.#app.get("/adminDashboard", async(req,res) => {
//     const name = req.body.name;
//     const timeDuration = req.body.timeDuration;
//     const date= req.body.date;
//     const location = req.body.location;
//     const room = req.body.room;
//     const subject = req.body.subject;
//
//     try{
//         const data = await this.#databaseHelper.handleQuery( {
//             query: "SELECT * FROM testlesson WHERE name = ? , timeDuration = ?, date = ?, location = ?, room = ?, subject = ?",
//             values: [name,timeDuration,date,location,room,subject]
//         });
//         if(data.insertId){
//             res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.insertId});
//         }
//     }
//     catch (e){
//         res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
//     }
// });
//     }
}
module.exports = adminDashboardRoute;
