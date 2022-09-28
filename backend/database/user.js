const { getAuth, signInWithEmailAndPassword, sendEmailVerification, updateProfile } = require("firebase/auth");
const { getDatabase, ref, get, child } = require("firebase/database");

const { fapp } = require('./firebaseconf');

exports.validate = async (req, res) => {
    const auth = getAuth(fapp);
    sendEmailVerification(auth.currentUser).then(() => {
        res.status(200).send({
        message: `Un email de vérification a été envoyé à l'adresse ${auth.currentUser.email}`,
        });
    }).catch((error) => {
        res.status(500).send({
            message: error,
        });
    });
    
}

exports.getUser = async (req, res) => {
    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    if(user !== null){
        get(child(database, `users/${user.uid}`)).then((data) => {
            if (data.exists()) {
                const snapshot = data.val();
                switch (snapshot.employe) {
                    case false:
                        res.status(200).send({
                            success: true,
                            data: {
                                Id_user: snapshot.Id_user,
                                nom_user: snapshot.nom_user,
                                prenom_user: snapshot.prenom_user,
                                email_user: snapshot.email_user,
                                employe: snapshot.employe,
                                pays: snapshot.pays,
                                province: snapshot.province,
                                codePostal: snapshot.codePostal,
                                photoProfil: snapshot.photoProfil
                            }
                        });
                        break;
                    case true:
                        res.status(200).send({
                            success: true,
                            data: {
                                Id_user: snapshot.Id_user,
                                nom_user: snapshot.nom_user,
                                prenom_user: snapshot.prenom_user,
                                email_user: snapshot.email_user,
                                employe: snapshot.employe,
                                rue: snapshot.rue,
                                pays: snapshot.pays,
                                province: snapshot.province,
                                codePostal: snapshot.codePostal,
                                photoProfil: snapshot.photoProfil
                            }
                        });
                        break;
                };
            }
            else{
                res.status(404).send({
                    success: false,
                    message: "l'utilisateur n'existe pas",
                });
            }
        }).catch((error) => {
            res.status(500).send({
                success: false,
                message: error,
            });
        });
    } else {
        res.status(401).send({
            success: false,
            message: "l'utilisateur n'est pas connecté",
        });
    }
}


exports.loginUsers = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const auth = getAuth(fapp);

    if(email !== "" && password !== ""){
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            res.status(200).json({ token: user });
        }).catch((error) => {
            switch(error.code) {
                case "auth/user-not-found":
                    res.status(404).json({ 
                                            success: false,
                                            message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                                        });
                    break;
                case "auth/wrong-password":
                    res.status(403).json({
                                            success: false,
                                            message: "Le mot de passe est incorrect"
                                        });
                  break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: "un problème est survenu lors de la connexion"
                     });
                }   
        });
    }else{
        res.status(400).json({ message: "Email ou mot de passe manquant" });
    }
}