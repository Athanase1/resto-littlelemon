export function validerDate(dateStr) {
  if (!dateStr) return false;

  const [year, month, day] = dateStr.split("-").map(Number);
  const dateSelectionnee = new Date(year, month - 1, day);

  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);
  dateSelectionnee.setHours(0, 0, 0, 0);

  const diffJours = (dateSelectionnee - aujourdHui) / (1000 * 60 * 60 * 24);

  return diffJours >= 0 && diffJours <= 7;
}


export function validerNom(nom) {
  return nom && nom.trim().length >= 2;
}

export function validerPrenom(prenom) {
  return prenom && prenom.trim().length >= 2;
}
export function validerOccasion(occ) {
  return occ && occ.trim().length >= 3;
}

export function validerEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function validerTelephone(tel) {
  // Supprime les espaces, tirets et parenthèses
  const nettoye = tel.replace(/[\s\-().]/g, '');

  // Expression régulière pour valider les formats courants :
  // Commence par + ou 0, puis 9 à 14 chiffres
  return /^(\+?\d{1,3})?\d{9,14}$/.test(nettoye);
}
export function validernbPersonnes(nbPersonnes) {
  const converti = parseInt(nbPersonnes, 10);

  // Vérifie que c'est un nombre entier et >= 1
  return !isNaN(converti) && Number.isInteger(converti) && converti >= 1;
}
export function validerMotDePasse(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}


export function validerChampsReservation(champs, date,nbPersonnes, occ,heure) {
  const erreurs = {};

  if (!champs.nom || champs.nom.trim().length < 2) {
    erreurs.nom = "Le nom est obligatoire (min. 2 caractères)";
  }


  if (!champs.prenom || champs.prenom.trim().length < 2) {
    erreurs.prenom = "Le prénom est obligatoire (min. 2 caractères)";
  }

  if (!champs.email) {
    erreurs.email = "L'email est obligatoire";
  } else if (!validerEmail(champs.email)) {
    erreurs.email = "Format d'email invalide";
  }

  if (!champs.tel) {
    erreurs.tel = "Le numéro de téléphone est obligatoire";
  } else if (!validerTelephone(champs.tel)) {
    erreurs.tel = "Numéro de téléphone invalide";
  }

  if (!date) {
    erreurs.date = "La date est obligatoire";
  } else if (!validerDate(date)) {
    erreurs.date = "La date doit être aujourd'hui ou dans les 7 jours";
  }
  if(!nbPersonnes){
    erreurs.nbPersonnes = "Le nombre de personnes est obligatoire"
  }else if(!validernbPersonnes(nbPersonnes)){
        erreurs.nbPersonnes = "Le nombre de personnes est invalide."
  }

  if (!heure) {
    erreurs.heure = "L'heure est obligatoire";
  } else if (!["18:00", "19:00", "20:00", "21:00"].includes(heure)) {
    erreurs.heure = "L'heure doit être entre 18h et 21h";
  }

  if (!occ || occ.trim().length < 3) {
    erreurs.occasion = "L'occasion est obligatoire (min. 3 caractères)";
  }

  return erreurs;
}
export function validerForm(nom, prenom, tel, email, password) {
  const erreurs = {};

  nom = typeof nom === "string" ? nom.trim() : "";
  prenom = typeof prenom === "string" ? prenom.trim() : "";
  email = typeof email === "string" ? email.trim() : "";
  tel = typeof tel === "string" ? tel.trim() : "";
  password = typeof password === "string" ? password : "";

  if (nom.length < 2) {
    erreurs.nom = "Le nom est obligatoire (min. 2 caractères)";
  }
  if (prenom.length < 2) {
    erreurs.prenom = "Le prénom est obligatoire (min. 2 caractères)";
  }
  if (!tel) {
    erreurs.tel = "Le numéro de téléphone est obligatoire";
  } else if (!validerTelephone(tel)) {
    erreurs.tel = "Numéro de téléphone invalide";
  }
  if (!email) {
    erreurs.email = "L'email est obligatoire";
  } else if (!validerEmail(email)) {
    erreurs.email = "Format d'email invalide";
  }
  if (!password) {
    erreurs.password = "Champ obligatoire";
  } else if (!validerMotDePasse(password)) {
    erreurs.password = "Mot de passe invalide";
  }

  return erreurs;
}

export function validerConnexion(champs){
  const erreurs = {}
  if(!champs.password){
    erreurs.password = "Champ obligatoire"
  } else if(!validerMotDePasse(champs.password)){
    erreurs.password = "Mot de passe Invalide"
  }
      if (!champs.email) {
    erreurs.email = "L'email est obligatoire";
  } else if (!validerEmail(champs.email)) {
    erreurs.email = "Format d'email invalide";
  }
  return erreurs;
}
export function validerChampModification(date, nbPersonnes, occ,heure){
   const  erreurs = {}
    if (!heure) {
    erreurs.heure = "L'heure est obligatoire";
  } else if (!["18:00", "19:00", "20:00", "21:00"].includes(heure)) {
    erreurs.heure = "L'heure doit être entre 18h et 21h";
  }
    if (!occ || occ.trim().length < 3) {
    erreurs.occasion = "L'occasion est obligatoire (min. 3 caractères)";
  }
   if (!date) {
    erreurs.date = "La date est obligatoire";
  } else if (!validerDate(date)) {
    erreurs.date = "La date doit être aujourd'hui ou dans les 7 jours";
  }
  if(!nbPersonnes){
    erreurs.nbPersonnes = "Le nombre de personnes est obligatoire"
  }else if(!validernbPersonnes(nbPersonnes)){
        erreurs.nbPersonnes = "Le nombre de personnes est invalide."
  }
  return erreurs;
}
export function estReservationValide(reservation) {
  const maintenant = new Date();

  const date = reservation.id_reservation.date; // Ex: "2025-07-13"
  const heure = reservation.id_reservation.heure; // Ex: "19:00"

  const [h, m] = heure.split(":").map(Number);

  // Crée une date locale correcte en combinant date + heure
  const dateHeureComplete = new Date(`${date}T${heure}:00`);

  // Vérifie si cette date est dans le futur
  return dateHeureComplete.getTime() >= maintenant.getTime();
}




