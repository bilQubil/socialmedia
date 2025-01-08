class Controller {
    static async getPost(req, res){
        try {
            
        } catch (error) {
            console.error(error)
            if(error.name === 'SequelizeValidationError'){
                error = error.errors.map((el) => {
                    return el.message
                })
            } res.send(error)
        }
    }
    static async newPost(req, res){
        try {
            
        } catch (error) {
            console.error(error)
            if(error.name === 'SequelizeValidationError'){
                error = error.errors.map((el) => {
                    return el.message
                })
            } res.send(error)
        }
    }
    static async getTags(req, res){
        try {
            
        } catch (error) {
            console.error(error)
            if(error.name === 'SequelizeValidationError'){
                error = error.errors.map((el) => {
                    return el.message
                })
            } res.send(error)
        }
    }
    static async postTags(req, res){
        try {
            
        } catch (error) {
            console.error(error)
            if(error.name === 'SequelizeValidationError'){
                error = error.errors.map((el) => {
                    return el.message
                })
            } res.send(error)
        }
    }
}

module.exports = Controller