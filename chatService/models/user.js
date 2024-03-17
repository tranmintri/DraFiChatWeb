class User {
    constructor(userId,name,email,profilePicture) {
        this.userId = userId;
        this.name = name;
        this.profilePicture = profilePicture;
        this.email = email
    }
}
module.exports = {User}