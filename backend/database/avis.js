const { addAvis, updateAvis, getAvis, deleteAvis } = require("./requeteKnex");
const { fapp } = require('./firebaseconf');
const { getAuth } = require("firebase/auth");

const { getService } = require("./requeteKnex");
const { get, child, ref, getDatabase } = require("firebase/database");

// router pour creer un avis
exports.createAvis =  async (req, res) => {

    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const idDist = req.params.idService;
    let avisToSend;

    if (user !== null) {
        const idClient = user.uid;
        try { 
            const { serviceORuser, note, commentaire } = req.body;
            if (note === undefined || commentaire === undefined)
                return res.status(400).json({ success : false, message: 'veuillez verifier les champs necessaires'});

            if(serviceORuser){
                const data = await getService(idDist);
                if(data.length === 0) {
                    return res.status(404).json({ success: false, message: "aucun service trouvé" });
                } else {
                    avisToSend = {
                        id_client: idClient,
                        id_service: idDist,
                        note: note,
                        commentaire: commentaire,
                        datePublication: new Date().toLocaleString('fr-FR', 'Canada/Montréal'),
                    }
                }
            } 
            if (!serviceORuser) {
                await get(child(database, `users/${idDist}`)).then((data) => {
                    if (data.exists()) {
                        avisToSend = {
                            id_client: idClient,
                            id_user: idDist,
                            note: note,
                            commentaire: commentaire,
                            datePublication: new Date().toLocaleString('fr-FR', 'Canada/Montréal'),
                        }
                    } else {
                        return res.status(404).json({ success: false, message: "aucun utilisateur trouvé" });
                    }
                }).catch((error) => {
                    return res.status(500).json({ success: false, message: error });
                });
            }
                
            await addAvis(avisToSend);
            return res.status(201).json({ success: true, message: "Merci d'avoir donné votre avis" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "une erreur est survenue lors de l'ajout de l'avis" });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Vous n\'êtes pas connecté' });
    }
}


exports.updateAvis = async(req,res) =>{
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    let id_client = '';

    const id = req.params.idAvis;
    const data = await getAvis(id);

    if(data.length === 0) {
        return res.status(404).json({ success: false, message: "aucun avis trouvé" });
    } else {
        id_client = data[0].id_client;
    }

    if (user !== null && user.uid === id_client) {
        const { note, commentaire } = req.body;
        try {
            if (note === undefined || commentaire === undefined) {
                return res.status(400).json({ success : false, message: 'paramètre manquant'});
            }
            const DataToSend = {
                note: note,
                commentaire: commentaire,
            };
            // updte de données
            await updateAvis(id, DataToSend)
            return res.status(201).json({ success : true, message: 'le service a été mis à jour' });
        } catch (error) {
            return res.status(500).json({ success: false, message: "une erreur est survenu lors de la mise à jour" });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Vous n\'êtes pas connecté' });
    }
}

exports.deleteAvis = async(req,res) =>{
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    let id_client = '';

    const id = req.params.idAvis;

    const data = await getAvis(id);
    if(data.length === 0) {
        return res.status(404).json({ success: false, message: "aucun avis trouvé" });
    } else {
        id_client = data[0].id_client;
    }

    if (user !== null && user.uid === id_client) {
        try {
            const delAvis = await deleteAvis(id);
            if(delAvis) return res.status(201).json({ success : true, message: 'le service a été supprimé' });
            res.status(500).json({ success: false, message: "une erreur est survenue lors de la suppression" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "une erreur est survenu lors de la suppression" });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Vous n\'êtes pas connecté' });
    }
}