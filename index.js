import express from "express"
import bodyParser from 'body-parser'
import { Employe, Tache } from "./gestionEmlpoye.js";

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Bonjour les simploniens");
});

app.post("/app", (req, res) => {
    //employe
    const emlpoye1 = new Employe()
    emlpoye1.createEmploye({ nom: "Ly", prenom: "Ousmane", email: "ousmane492@gmail.com", poste: "fullstack developper", dateEmbauche: "2024-10-12", statut:"Senior"})
    const emlpoye2 = new Employe()
    emlpoye2.createEmploye({ nom: "Bradji", prenom: "Assa", email: "asa@gmail.com", poste: "fullstack developper", dateEmbauche: "2024-10-12", statut:"Senior"})
    

    //tache
    const tache1 = new Tache()
    tache1.createTache({nom: "README", description: "Redaction du README", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut:"Status", priorite: "Haut"})
    
    const tache2 = new Tache()
    tache2.createTache({nom: "Front End", description: "Développement Front End", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut:"Status", priorite: "Haut"})
    
    let status = 200;
    let employes = [emlpoye1, emlpoye2]
    let taches = [tache1, tache2]

    let message = {"Tache": taches, "Employe": employes}
    if (!taches && !employes) {
        message = "Not found";
        status = 400;
    }

    res.status(status).json({ message });

});

app.put("/app", (req, res) =>{

    const emlpoye2 = new Employe()
    emlpoye2.editEmploye({ nom: "Thimbo", prenom: "Abderrahman", email: "adad@gmail.com", poste: "frontEnd developper", dateEmbauche: "2024-10-12", statut:"Senior"})
    
    const tache2 = new Tache()
    tache2.editTache({nom: "Maquette", description: "Disigner l'application", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut:"Status", priorite: "Haut"})
    
    let status = 200;
    let employes = [emlpoye2]
    let taches = [tache2]
    let message = {"Tache": taches, "Employe": employes}
    if (!taches && !employes) {
        message = "Not found";
        status = 400;
    }

    res.status(status).json({ message });
})

app.get("/app", (req, res) =>{
    const emlpoye2 = new Employe()
    emlpoye2.createEmploye({ nom: "Thimbo", prenom: "Abderrahman", email: "adad@gmail.com", poste: "frontEnd developper", dateEmbauche: "2024-10-12", statut:"Senior"})
    

    const tache2 = new Tache()
    tache2.createTache({nom: "Maquette", description: "Disigner l'application", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut:"Status", priorite: "Haut"})

    
    let status = 200;
    let employes = emlpoye2.getEmploye()
    let taches = tache2.getTache()
    let message = {"Tache": taches, "Employe": employes}
    if (!taches && !employes) {
        message = "Not found";
        status = 400;
    }

    res.status(status).json({ message });
})

app.delete("/app", (req, res) =>{
    const emlpoye2 = new Employe()
    emlpoye2.createEmploye({ nom: "Thimbo", prenom: "Abderrahman", email: "adad@gmail.com", poste: "frontEnd developper", dateEmbauche: "2024-10-12", statut:"Senior"})
    emlpoye2.destroyEmploye()

    const tache2 = new Tache()
    tache2.createTache({nom: "Maquette", description: "Disigner l'application", dateDebut: "2024-03-23", dateFin: "2024-05-23", statut:"Status", priorite: "Haut"})
    tache2.destroyTache()
    
    let status = 200;
    let employes = emlpoye2;
    let taches = tache2;
    let message = {"Tache": taches, "Employe": employes}
    if (!taches && !employes) {
        message = "Not found";
        status = 400;
    }

    res.status(status).json({ message });
})

app.listen(port, () => {
    console.log(`L'application est en ecoute sur port ${port}`);
});