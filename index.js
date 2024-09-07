import express from "express"
import bodyParser from 'body-parser'
import { Assignation, Employe, Tache } from "./gestionProjet.js";

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Bonjour les simploniens");
});

app.post("/app", (req, res) => {
    //employe
    const emlpoye1 = new Employe()
    emlpoye1.createEmploye({ nom: "Ly", prenom: "Ousmane", email: "ousmane492@gmail.com", poste: "fullstack developper", dateEmbauche: "2024-10-12", statut: "Senior" })
    const emlpoye2 = new Employe()
    emlpoye2.createEmploye({ nom: "Bradji", prenom: "Assa", email: "asa@gmail.com", poste: "fullstack developper", dateEmbauche: "2024-10-12", statut: "Senior" })
    const emlpoye3 = new Employe()
    emlpoye3.createEmploye({ nom: "Omar", prenom: "Ndiay", email: "omar@gmail.com", poste: "fullstack developper", dateEmbauche: "2024-10-12", statut: "Senior" })
    const employes = [emlpoye1.getEmploye(), emlpoye2.getEmploye(), emlpoye3.getEmploye()]
    emlpoye3.editEmploye({ nom: "Thimbo", prenom: "Abderrahman", email: "adad@gmail.com", poste: "frontEnd developper", dateEmbauche: "2024-10-12", statut: "Senior" })
    const neWemployes = [emlpoye1.getEmploye(), emlpoye2.getEmploye(), emlpoye3.getEmploye()]
    emlpoye3.destroyEmploye();
    const afterDropEmploye = [emlpoye1.getEmploye(), emlpoye2.getEmploye(), emlpoye3.getEmploye()]


    //tache
    const tache1 = new Tache()
    tache1.createTache({ nom: "README", description: "Redaction du README", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut: "Status", priorite: "Haut" })
    const tache2 = new Tache()
    tache2.createTache({ nom: "Front End", description: "Développement Front End", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut: "Status", priorite: "Haut" })
    const tache3 = new Tache()
    tache3.createTache({ nom: "Authentification", description: "Développement Front End", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut: "Status", priorite: "Haut" })
    const taches = [tache1.getTache(), tache2.getTache(), tache3.getTache()]
    tache3.editTache({ nom: "Maquette", description: "Disigner l'application", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut: "Status", priorite: "Haut" })
    const newTaches = [tache1.getTache(), tache2.getTache(), tache3.getTache()]
    tache3.destroyTache()
    const afterDropTache = [tache1.getTache(), tache2.getTache(), tache3.getTache()]

    //assignation

    Assignation.assignerTache({employe: emlpoye1.getEmploye(), tache: tache2.getTache()})
    Assignation.assignerTache({employe: emlpoye2.getEmploye(), tache: tache1.getTache()})
    const assignation = Assignation.getTab();
    const tachesAssigne = Assignation.obtenirTachesAssigne(emlpoye1.getEmploye())
    const employeAssigne = Assignation.obtenirEmployeAssigne(tache2.getTache())
    Assignation.retirerTâche(emlpoye2.getEmploye())
    const afterDropAssignation = Assignation.getTab();

    res.status(200).json({ 
        // employes: employes, 
        // neWemployes: neWemployes, 
        // afterDropEmploye: afterDropEmploye,

        // taches: taches,
        // newTaches: newTaches,
        // afterDropTache: afterDropTache

        // assignation,
        // tachesAssigne
        // employeAssigne
        afterDropAssignation
        
    });

});

app.listen(port, () => {
    console.log(`L'application est en ecoute sur port ${port}`);
});