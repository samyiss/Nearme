const { getAuth, signInWithEmailAndPassword, sendEmailVerification, updateEmail, createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail} = require("firebase/auth");
const { getDatabase, ref, set, get, child, remove } = require("firebase/database");

const { fapp } = require('./firebaseconf');

function validate_email(email){
    const expression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return expression.test(email) ? true : false
}

function validate_password(password){
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g
    return regex.test(password) ? true : false
}

exports.registerUser = async(req,res) =>{

    const database = ref(getDatabase());
    const auth = getAuth(fapp);

    const nom_user = req.body.nom_user
    const email_user = req.body.email_user
    const password = req.body.password
    const Tel = req.body.telephone

    if(nom_user && validate_email(email_user) && validate_password(password) && Tel){
        await createUserWithEmailAndPassword(auth, email_user, password)
        .then(() => {
            const user = auth.currentUser;
            const user_data =  {
                id_user:user.uid,
                nom_user: nom_user,
                email_user: email_user,
                telephone: Tel,
            } 
            set(child(database, `users/${user.uid}`), user_data)
            .then(()=>{
                res.status(201).send({
                    success:true,
                    message: `Utilisateur créé`,
                })
            })
            .catch(() => {
                switch(error.code) {
                    case "auth/email-already-in-use":
                        res.status(409).json({ 
                            success: false,
                            message: "L'utilisateur existe déjà"
                        });
                        break;
                    default:
                        res.status(500).json({ 
                            success: false,
                            message: "Erreur lors de la création de l'utilisateur"
                         });
                }   
            })
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/email-already-in-use":
                    res.status(409).json({ 
                        success: false,
                        message: "L'utilisateur existe déjà"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: "Erreur lors de la création de l'utilisateur"
                     });
            }   
        })  
    }
    else{
        res.status(400).send({
            success:false,
            message:'veuillez remplir tous les champs'
        })
    }
}

exports.updateProfile = async(req,res) =>{

    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    const nom_user = req.body.nom_user
    const prenom_user = req.body.prenom_user
    const email_user = req.body.email_user
    const date_naissance = req.body.date_naissance
    const rue = req.body.rue
    const pays = req.body.pays
    const province = req.body.province
    const codePostal = req.body.codePostal
    const photoProfil = req.body.photoProfil
    const password = req.body.password
    const Tel = req.body.telephone
    
    // mettre à jour les données de l'utilisateur
    if(user !== null){
        if(nom_user !== "" && prenom_user !=="" && validate_email(email_user) && validate_password(password) || Tel !==""){
            const user_data =  {
                nom_user: nom_user,
                prenom_user: prenom_user,
                email_user: email_user,
                date_naissance: date_naissance,
                telephone: Tel ? Tel : null,
                rue: rue ? rue : null,
                pays: pays? pays:null,
                province: province? province:null,
                codePostal: codePostal,
                photoProfil: photoProfil? photoProfil : null,
            } 
            set(child(database, `users/${user.uid}`), user_data)
            .then(()=>{
                //update email
                updateEmail(user, email_user)
                .then(() => {
                    res.status(201).send({
                        success:true,
                        message: `Utilisateur modifié`,
                    })
                })
                .catch((error) => {
                    switch(error.code) {
                        case "auth/email-already-in-use":
                            res.status(409).json({ 
                                success: false,
                                message: "L'email existe déjà"
                            });
                            break;
                        default:
                            res.status(500).json({ 
                                success: false,
                                message: "Erreur lors de la mis à jour de l'utilisateur"
                             });
                    }   
                })
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/user-not-found":
                        res.status(404).json({ 
                            success: false,
                            message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                        });
                        break;
                    default:
                        res.status(500).send({ 
                            success: false,
                            message: "Erreur lors de la mis à jour de l'utilisateur"
                        });
                }
            })
        }
        else{
            res.status(400).send({
                success:false,
                message:'veuillez vérifier ou remplier les champs nécessaires'
            })
        }
    }
    else{
        res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }
}

exports.resetPassword = async(req,res) =>{
    const auth = getAuth(fapp);
    const email = req.params.email
    const user = auth.currentUser

    if(user !== null){
        sendPasswordResetEmail(auth, user.email)
            .then(()=>{
                res.status(201).send({
                    success:true,
                    message: `l'email de réinitialisation a été envoyé`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    success: false,
                    message: 'Une erreur est survenue',
                });
            })
    }
    else if(email !==""){
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            res.status(201).send({
                success:true,
                message: `l'email de réinitialisation a été envoyé`,
            });
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/invalid-email":
                    res.status(400).json({ 
                        success: false,
                        message: "veuillez remplir tous les champs"
                    });
                    break;
                case "auth/user-not-found":
                    res.status(404).json({ 
                        success: false,
                        message: "veuillez verifier votre email"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: 'une erreur est survenue'
                    });
                }
        })
    }
}


exports.deleteUser = async(req,res) =>{
    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    if(user !== null){
        await remove(child(database, `users/${user.uid}`), null)
        .then(()=>{
            deleteUser(user)
            .then(()=>{
                res.status(201).send({
                    success:true,
                    message: `votre compte a été supprimé`,
                });
            })
            .catch(() => {
                res.status(500).send({
                    success:false,
                    message: "un problème est survenu lors de la supression de l'utilisateur"
                });
            });
        })
        .catch(() => {
            switch(error.code) {
                case "auth/user-not-found":
                    res.status(404).json({ 
                        success: false,
                        message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: "un problème est survenu lors de la supression de l'utilisateur"
                     });
                }   
        });
    } else{
        res.status(401).send({
            message: 'utilisateur non connecté',
        });
    }
}


exports.validate = async (req, res) => {
    const auth = getAuth(fapp);
    const user = auth.currentUser
    if(user !== null && !user.emailVerified){
        sendEmailVerification(user).then(() => {
            res.status(200).send({
                success:true,
                message: `Un email de vérification a été envoyé à l'adresse ${user}`,
            });
        }).catch((error) => {
            res.status(500).send({
                message: error,
            });
        });
    }
    else{
        auth.signOut()
    }
    
}


exports.getUsers = async (req, res) => {
    const database = ref(getDatabase());
    const listesUsers = []
    get(child(database, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                listesUsers.push({
                    Id_user: childSnapshot.key,
                    nom_user: childSnapshot.val().nom_user,
                    prenom_user: childSnapshot.val().prenom_user,
                    photoProfil: childSnapshot.val().photoProfil,
                })  
            });
            res.status(200).send(listesUsers)
        } else{
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
}


exports.getUser = async (req, res) => {
    const database = ref(getDatabase());
    const idUser = req.params.id

    get(child(database, `users/${idUser}`)).then((data) => {
        if (data.exists()) {
            const snapshot = data.val();
            switch (snapshot.employe) {
                case false:
                    res.status(200).send({
                        Id_user: snapshot.Id_user,
                        nom_user: snapshot.nom_user,
                        prenom_user: snapshot.prenom_user,
                        date_naissance:snapshot.date_naissance,
                        email_user: snapshot.email_user,
                        employe: snapshot.employe,
                        pays: snapshot.pays,
                        province: snapshot.province,
                        codePostal: snapshot.codePostal,
                        photoProfil: snapshot.photoProfil
                    });
                    break;
                case true:
                    res.status(200).send({
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
        res.status(400).json({ success:false, message: "Email ou mot de passe manquant" });
    }
}