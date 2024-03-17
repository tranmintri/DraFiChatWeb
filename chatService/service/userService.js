const {v4: uuidv4} = require('uuid');
const {Conversation, Message} = require('../models/chat');
const admin = require("firebase-admin")
const {db} = require('../config/firebase')
const {User} = require("../models/user");


const findAll = async () => {

    const users = await db.collection('Users');
    const data = await users.get();
    const usersArrays = [];
    if(data.empty) {
        throw new Error('user is empty.');
    }else {
        data.forEach(doc => {
            const user = new User(
                doc.data().userId,
                doc.data().name,
                doc.data().email,
                doc.data().profilePicture,
            );
            usersArrays.push(user);
        });
        const  usersGroupsByInitialLetter = {}
        usersArrays.forEach((user) =>{
            const initialLetter = user.name.charAt(0).toUpperCase()
            if(!usersGroupsByInitialLetter[initialLetter]){
                usersGroupsByInitialLetter[initialLetter] = []
            }
            usersGroupsByInitialLetter[initialLetter].push(user)
        })
        return usersGroupsByInitialLetter
    }
};
const getUserData = async (collectionName, fieldName, value) => {
    const query = db.collection(collectionName).where(fieldName, '==', value);

    try {
        const querySnapshot = await query.get();
        if (!querySnapshot.empty) {
            const documentData = querySnapshot.docs[0].data();
            return documentData;
        } else {
            console.log('Document not found.');
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
}
const save = async (data) => {
    // Kiểm tra xem data có dữ liệu không
    if (!data) {
        throw new Error('User data is empty.');
    }

    const userId = uuidv4();

    // Thêm dữ liệu vào Firestore nếu số điện thoại chưa tồn tại
    await db.collection('Users').doc(userId).set({
        userId: userId,
        email: data.email,
        profilePicture:data.profilePicture,
        name:data.name
    });

    return 'Record saved successfully';
};

const findByEmail = async (email) => {
    const userData = await getUserData('Users', 'email', email);

    if (userData) {
        return userData;
    } else {
        return null;
    }
};




module.exports = {save, findAll, findByEmail}