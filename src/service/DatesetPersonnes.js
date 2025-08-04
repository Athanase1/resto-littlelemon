export const heuresDeBase = ["18:00", "19:00", "20:00", "21:00"];

export function getHeuresDisponible(dateSelectionnee) {
  const now = new Date();
const [year, month, day] = dateSelectionnee.split('-').map(Number);
const selectedDate = new Date(year, month - 1, day); // mois commence à 0
  const sameDay =
    now.getFullYear() === selectedDate.getFullYear() &&
    now.getMonth() === selectedDate.getMonth() &&
    now.getDate() === selectedDate.getDate();

  return heuresDeBase.filter((heure) => {
    if (!sameDay) return true;

    const [h, m] = heure.split(":").map(Number);
    const heureEnDate = new Date();
    heureEnDate.setHours(h, m, 0, 0);

    return heureEnDate > now;
  });
}


export const Personnes = [
  { label: "2 Personnes", value: 2 },
  { label: "4 Personnes", value: 4 },
  { label: "6 Personnes", value: 6 },
  { label: "8 Personnes", value: 8 },
];

export const occasions = [
  "Autres",
  "Anniversaire",
  "Rendez-vous Romantique",
  "Sortir Familliale",
];

export const dateDisponible = [];

const now = new Date();
const currentHour = now.getHours();

for (let i = 0; i < 7; i++) {
  const d = new Date();
  d.setDate(d.getDate() + i);

  // ⚠️ Si on est aujourd’hui et qu’il est 21h ou plus, on saute
  if (i === 0 && currentHour >= 21) continue;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const value = `${year}-${month}-${day}`; // "YYYY-MM-DD"

  const affichage = d.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  dateDisponible.push({
    value,
    label: affichage.charAt(0).toUpperCase() + affichage.slice(1),
  });
}


// Date d’aujourd’hui formatée
const aujourdHui = new Date();
const jour = aujourdHui.getDate();
const mois = aujourdHui.getMonth() + 1;
const annee = aujourdHui.getFullYear();
export const dateFormatee = `${annee}-${mois.toString().padStart(2, '0')}-${jour.toString().padStart(2, '0')}`;
