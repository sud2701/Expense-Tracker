import mongoose from 'mongoose';
const schema = mongoose.Schema;
import bcrypt from 'bcrypt';
const userSchema = new schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (username, password) {
    let user = await this.findOne({ username });
    if (user) {
        const bool = await bcrypt.compare(password, user.password);
        if (!bool) {
            throw Error("Incorrect Password");
        }
        else {
            return user;
        }
    }
    else {
        throw Error("User not found");
    }
}
const User = mongoose.model('User', userSchema);
export { User };