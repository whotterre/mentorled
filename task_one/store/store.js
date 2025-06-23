class Database {
    constructor(){
        this.items = []
    }
    // Gets the last ID of the last quote that was added
    getLastID(){
        return this.items.length > 0 ? this.items.length - 1 : 0;
    }
}

module.exports = Database