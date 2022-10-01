const { getAuth, signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword, deleteUser } = require("firebase/auth");
const { getDatabase, ref, set, get, child, update } = require("firebase/database");

const { fapp } = require('./firebaseconf');
const { getIppesAll } = require("./requeteKnex");

// add new service to sql server
exports.createService = async(req,res) =>{
    user = await getIppesAll();
    res.status(200).json(user)
}
