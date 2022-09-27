const { getAuth, signInWithEmailAndPassword, sendEmailVerification } = require("firebase/auth");
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

exports.loginUsers = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const auth = getAuth(fapp);

    if(email !== "" && password !== ""){
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            res.status(200).json({ token: user.stsTokenManager.accessToken });
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