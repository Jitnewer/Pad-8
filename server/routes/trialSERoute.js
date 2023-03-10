/**
 * Routes file for trialSE
 * @author Chant
 */
class trialSERoute{
    #app;
    constructor(app) {
        this.#app = app;
        this.#createTrialSE();
    }
    #createTrialSE(){
        this.#app.get("/trialSE",(req,res)=>
            res.send("API endpoint study gecalled"));
    }
}
module.exports = trialSERoute;