const {request, response} = require("express");

class helloWorldRoutes {

    #app

    constructor(app) {
        this.#app = app;

        this.#helloworld();

    }

    #helloworld(){
        this.#app.get("/helloworld",(request,response) =>{
            response.status(200).json({
                test:"helloworld",
                Error: "false"
            });
        })

        this.#app.get("/helloworld/:username",(request,response)=>{

            return response.status("200").json({
                test:`hello ${request.params.username}`
            });
        })

    }
}
module.exports = helloWorldRoutes;