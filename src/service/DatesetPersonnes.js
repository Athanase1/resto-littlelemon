export const heuresDisponible = [
    "18:00",
     "19:00",
     "20:00",
      "21:00",
]
export const Personnes = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
]
export const occasions = [
    "Autres",
    "Anniversaire",
    "Rendez-vous Romantique",
    "Sortir Familliale"
]
export const date = []


for (let i = 0; i < 7; i++) {
  const d = new Date();
  d.setDate(d.getDate() + i);
  const formatted = d.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  date.push(formatted.charAt(0).toUpperCase() + formatted.slice(1));
}
