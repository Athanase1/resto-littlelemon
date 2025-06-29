export const heuresDisponible = [
    "18:00",
     "19:00",
     "20:00",
      "21:00",
]
export const Personnes = [
  {
    label:"2 Personnes",
    value:2
  },

    {
    label:"4 Personnes",
    value:4
  },
    {
    label:"6 Personnes",
    value:6
  },
    {
    label:"8 Personnes",
    value:8
  },
]
export const occasions = [
    "Autres",
    "Anniversaire",
    "Rendez-vous Romantique",
    "Sortir Familliale"
]
export const date = [];

for (let i = 0; i < 7; i++) {
  const d = new Date();
  d.setDate(d.getDate() + i);
  const iso = d.toISOString().split("T")[0]; // format "YYYY-MM-DD"
  const affichage = d.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  date.push({
    value: iso, // utile pour la logique
    label: affichage.charAt(0).toUpperCase() + affichage.slice(1), // pour l'affichage
  });
}
