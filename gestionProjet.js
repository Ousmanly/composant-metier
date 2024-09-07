export class Employe {
  
    createEmploye(employe) {
      this.nom = employe.nom;
      this.prenom = employe.prenom;
      this.email = employe.email;
      this.poste = employe.poste;
      this.dateEmbauche = employe.dateEmbauche;
      this.statut = employe.statut;
      console.log(`Employe: ${this.nom}, ${this.prenom}, ${this.email}, ${this.poste}, ${this.dateEmbauche},${this.statut} has been created`);
    }
  
    destroyEmploye() {
        this.nom = null;
        this.prenom = null;
        this.email = null;
        this.poste = null;
        this.dateEmbauche = null;
        this.statut = null;
      console.log(`Employe has been deleted`);
    }
  
    editEmploye(newEmploye) {
        this.nom = newEmploye.nom;
        this.prenom = newEmploye.prenom;
        this.email = newEmploye.email;
        this.poste = newEmploye.poste;
        this.dateEmbauche = newEmploye.dateEmbauche;
        this.statut = newEmploye.statut;
      console.log(`Employe: ${this.nom}, ${this.prenom}, ${this.email}, ${this.poste}, ${this.dateEmbauche},${this.statut} has been updated`);
    }
    getEmploye() {
      console.log(`Employe: ${this.nom}, ${this.prenom}, ${this.email}, ${this.poste}, ${this.dateEmbauche},${this.statut}`);
      return { nom: this.nom, prenom: this.prenom , email: this.email, poste: this.poste, dateEmbauche: this.dateEmbauche, statut: this.statut };
    }
  }

export class Tache {

  createTache(tache) {
    this.nom = tache.nom;
    this.description = tache.description;
    this.dateDebut = tache.dateDebut;
    this.dateFin = tache.dateFin;
    this.statut = tache.statut;
    this.priorite = tache.priorite;
    console.log(`Tache: ${this.nom}, ${this.description}, ${this.dateDebut}, ${this.dateFin}, ${this.statut}, ${this.priorite} has been created`);
}

  destroyTache() {
    this.nom = null;
    this.description = null;
    this.dateDebut = null;
    this.dateFin = null;
    this.statut = null;
    this.priorite = null;
    console.log(`Tache has been deleted`);
  }

  editTache(newTache) {
    this.nom = newTache.nom;
    this.description = newTache.description;
    this.dateDebut = newTache.dateDebut;
    this.dateFin = newTache.dateFin;
    this.statut = newTache.statut;
    this.priorite = newTache.priorite;
    console.log(`Tache: ${this.nom}, ${this.description}, ${this.dateDebut}, ${this.dateFin}, ${this.statut},${this.priorite} has been updated`);
  }
  getTache() {
    console.log(`Tache: ${this.nom}, ${this.description}, ${this.dateDebut}, ${this.dateFin}, ${this.statut},${this.priorite}`);
    return { nom: this.nom, description: this.description , dateDebut: this.dateDebut, dateFin: this.dateFin, statut: this.statut, priorite: this.priorite };
  }
}

export class Assignation {
  static tabAssignation = [];

  static assignerTache({employe, tache, dateAssignation}){
    Assignation.tabAssignation.push({employe, tache, dateAssignation})
  }

  static getTab(){
    return Assignation.tabAssignation
  }

  static obtenirTachesAssigne(employe){
    if (employe) {
      return Assignation.tabAssignation.filter(emp => emp.employe.nom === employe.nom)
      .map(ass => {
        return {
          tache : ass.tache,
          dateAssignation: ass.dateAssignation
        }
      })
    }
  }

  static obtenirEmployeAssigne(tache){
    if (tache) {
      return Assignation.tabAssignation.filter(t => t.tache.nom === tache.nom)
      .map(ass => {
        return {
          employe : ass.employe,
          dateAssignation: ass.dateAssignation
        }
      })
    }
  }

  static retirerTâche(employe){
    if (employe) {
      return Assignation.tabAssignation.filter(emp => emp.employe.nom === employe.nom)
      .map(ass => {
        return {
          tache : ass.tache = null,
          dateAssignation: ass.dateAssignation
        }
      })
    }
    console.log(`Tache has been deleted`);
  }
}