const { isEmpty } = require("@firebase/util");
const { getAuth, signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword, deleteUser } = require("firebase/auth");
const { getDatabase, ref, set, get, child, update } = require("firebase/database");

const { fapp } = require('./firebaseconf');

function validate_email(email){
    expression = /^[^@]+@\W+(\. \W+)+\W$/
    if (expression.test(email)==true){
        return true
    }
    else{
       return false 
    }
}

function validate_password(password){
    if (password > 6 && password < 12){
        return true
    }
    else{
        return false 
    }
}




exports.registerUser = async(req,res) =>{

    const database = getDatabase();
    const auth = getAuth(fapp);
    const user = auth.currentUser;


    const nom_user = req.body.nom_user
    const prenom_user = req.body.prenom_user
    const email_user = req.body.email_user
    const date_naissance = req.body.date_naissance
    const pays = req.body.pays
    const province = req.body.province
    const codePostal = req.body.codePostal
    const photoProfil = req.body.photoProfil
    const password = req.body.password
    const Tel = req.body.telephone
    
    if(!email_user =='' || !password ==''){
        await createUserWithEmailAndPassword(auth, email_user,password)
            .then(() =>{
                var user_data =  {
                    nom_user :nom_user,
                    prenom_user :prenom_user,
                    email_user:email_user
                } 
                set(ref(database, 'users/'+ user.uid),user_data).then(
                    res.status(201).send({
                        success:true,
                        message: `Utilisateur crée`,
                    })
                )
                
        
                /*
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    if (auth.currentUser.emailVerified){
                        database.child(database, `users/${user.uid}`).set(user_data)
                        res.status(200).send({
                            success:true,
                            message: `Utilisateur crée`,
                        });
                    }
                    else{
                        deleteUser(user)
                        res.status(404).send({
                            success:false,
                            message:`Un email de vérification a été envoyé à l'adresse ${auth.currentUser.email}`
                        })
                    }
                })
                .catch((error) => {
                    res.status(500).send({
                        message: error,
                    });
                });
                */
            })
            .catch((error) => {
                res.status(500).send({
                    success:false,
                    message: error,
                });
            })
            
    }
    else{
        res.status(401).send({
            success:false,
            message:'veuillez remplir tous les champs'
        })

    }

        

}

exports.updateProfile = async(req,res) =>{

    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;
}

exports.u

exports.deleteUser = async(req,res) =>{
    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    update(child(database, `users/${user.uid}`),null)
    .then(()=>{
        deleteUser(user)
        .then((data)=>{
            res.status(200).send({
                success:true,
                message: `Utilisateur Supprimé`,
            });
        })
        .catch(() => {
            res.status(500).send({
                message: 'Une erreur est survenue',
            });
        });
    })
    .catch(() => {
        res.status(500).send({
            message: 'Une erreur est survenue',
        });
    });

}


exports.validate = async (req, res) => {
    const auth = getAuth(fapp);
    sendEmailVerification(auth.currentUser).then(() => {
        res.status(200).send({
            success:true,
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
                                date_naissance:snapshot.date_naissance,
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