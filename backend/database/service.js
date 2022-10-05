const { getAuth, signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword, deleteUser } = require("firebase/auth");
const { getDatabase, ref, set, get, child, update } = require("firebase/database");

const { fapp } = require('./firebaseconf');
const { addService, getServices } = require("./requeteKnex");

exports.createService = async(req,res) =>{
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    if (user === null) {
        // choix des infos a envoyer selon la banque de données choisi
        const { Id_categorie, nomService, description, prix, photoCouverture } = req.body;
        try {
            if (Id_categorie === undefined && nomService === undefined)
                return res.status(400).json({ success : false, message: 'paramètre manquant'});

            const DataToSend = {
                Id_user: "user.uid",  
                Id_categorie: Id_categorie,
                nomService: nomService,
                description: description? description : '',
                prix: prix? prix : 0,
                photoCouverture: photoCouverture? photoCouverture : '',
                datePublication: new Date().toLocaleString('fr-FR', 'Canada/Montréal'),
            };
            // ajout de données
            const row = await addService(DataToSend)
            if(row !== []) {
                return res.status(201).json({ success : true, message: 'le service a été ajouté' });
            } else {
                return res.status(500).json({ success: false, message: "une erreur est survenue lors de l'ajout" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Vous n\'êtes pas connecté' });
    }
};


exports.getAllServices = async(req,res) =>{
    try {
        const services = await getServices();
        if(services !== []) {
            let data = [];
            services.forEach((service) => {
                dataDisplay = {
                    Id_service: service.id_service,
                    nomService: service.nomService,
                    prix: service.prix,
                    photoCouverture: service.photoCouverture,
                    datePublication: service.datePublication,
                }
                data.push(dataDisplay);
            });
            return res.status(200).json( data );
        } else {
            return res.status(404).json({ success: false, message: "aucun service trouvé" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "une erreur est survenue lors de la récupération des services" });
    }
}