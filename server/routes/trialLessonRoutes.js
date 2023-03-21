/**
 * Routes file for trial lesson
 * @author Chant & Kevin
 */
class trialLessonRoutes{
    #app;
    constructor(app) {
        this.#app = app;
        this.#createTrial();
    }
    #createTrial(){
this.#app.get("/trialLesson",(req,res)=>
    res.send("API endpoint study gecalled"));


}
}
module.exports = trialLessonRoutes;