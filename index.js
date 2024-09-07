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
    // const employes = [emlpoye1.getEmploye(), emlpoye2.getEmploye()]
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
    // const a1 = new Assignation()
    // a1.assignerTache({employe: emlpoye1, tache:tache1, dateAssignation: "2024-23-01" })
    // const a2 = new Assignation()
    // a2.assignerTache({employe: emlpoye2, tache:taches, dateAssignation: "2024-03-01" })
    // let assignations = [a1, a2]

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

app.put("/app", (req, res) => {

    const emlpoye2 = new Employe()
    emlpoye2.editEmploye({ nom: "Thimbo", prenom: "Abderrahman", email: "adad@gmail.com", poste: "frontEnd developper", dateEmbauche: "2024-10-12", statut: "Senior" })

    const tache2 = new Tache()
    tache2.editTache({ nom: "Maquette", description: "Disigner l'application", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut: "Status", priorite: "Haut" })

    let status = 200;
    let employes = [emlpoye2]
    let taches = [tache2]
    let message = { "Tache": taches, "Employe": employes }
    if (!taches && !employes) {
        message = "Not found";
        status = 400;
    }

    res.status(status).json({ message });
})

app.get("/app", (req, res) => {
    const emlpoye2 = new Employe()
    emlpoye2.createEmploye({ nom: "Thimbo", prenom: "Abderrahman", email: "adad@gmail.com", poste: "frontEnd developper", dateEmbauche: "2024-10-12", statut: "Senior" })
    let employes = emlpoye2.getEmploye()

    const tache2 = new Tache()
    tache2.createTache({ nom: "Maquette", description: "Disigner l'application", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut: "Status", priorite: "Haut" })
    let taches = tache2.getTache()

    const a2 = new Assignation()
    a2.assignerTache({ employe: employes, tache: taches, dateAssignation: "2024-23-01" })
    let TacheAssignations = a2.obtenirTachesAssignées();
    let EmployeAssignation = a2.obtenirEmployésAssignés()

    let status = 200;

    let message = { "Tache": taches, "Employe": employes, "Tache assigner": TacheAssignations, "Employe assigner": EmployeAssignation }
    if (!taches && !employes && !TacheAssignations && !EmployeAssignation) {
        message = "Not found";
        status = 400;
    }

    res.status(status).json({ message });
})

app.delete("/app", (req, res) => {
    const emlpoye2 = new Employe()
    emlpoye2.createEmploye({ nom: "Thimbo", prenom: "Abderrahman", email: "adad@gmail.com", poste: "frontEnd developper", dateEmbauche: "2024-10-12", statut: "Senior" })
    emlpoye2.destroyEmploye()
    let employes = emlpoye2;

    const tache2 = new Tache()
    tache2.createTache({ nom: "Maquette", description: "Disigner l'application", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut: "Status", priorite: "Haut" })
    tache2.destroyTache()
    let taches = tache2;

    const a2 = new Assignation()
    a2.assignerTache({ employe: emlpoye2, tache: tache2, dateAssignation: "2024-23-01" })
    a2.retirerTâche()
    let assignation = a2;

    let status = 200;

    let message = { "Tache": taches, "Employe": employes, "Assignation": assignation }
    if (!taches && !employes && !assignation) {
        message = "Not found";
        status = 400;
    }

    res.status(status).json({ message });
})

app.listen(port, () => {
    console.log(`L'application est en ecoute sur port ${port}`);
});