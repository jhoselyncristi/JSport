document.addEventListener("DOMContentLoaded", function () {
  const publishForm = document.getElementById("publishForm");
  const feedList = document.getElementById("feedList");
  const filterSport = document.getElementById("filterSport");
  const filterNeighborhood = document.getElementById("filterNeighborhood");

  const matches = [];

  // Publicar un partido
  publishForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sport = document.getElementById("sport").value;
    const neighborhood = document.getElementById("neighborhood").value.trim();
    const date = document.getElementById("matchDate").value;
    const time = document.getElementById("matchTime").value;
    const players = document.getElementById("playersNeeded").value;
    const description = document.getElementById("matchDescription").value.trim();

    if (!sport || !neighborhood || !date || !time || !players || !description) {
      alert("Completa todos los campos antes de publicar.");
      return;
    }

    matches.unshift({
      sport: sport,
      neighborhood: neighborhood,
      date: date,
      time: time,
      players: players,
      description: description
    });

    showMatches();
    publishForm.reset();

    document.getElementById("homeView").scrollIntoView({
      behavior: "smooth"
    });

    alert("¡Partido publicado correctamente!");
  });

  // Mostrar partidos y aplicar filtros
  function showMatches() {
    const sportSelected = filterSport.value;
    const neighborhoodSelected = filterNeighborhood.value.trim().toLowerCase();

    const filtered = matches.filter(function (match) {
      const sameSport =
        !sportSelected || match.sport === sportSelected;

      const sameNeighborhood =
        !neighborhoodSelected ||
        match.neighborhood.toLowerCase() === neighborhoodSelected;

      return sameSport && sameNeighborhood;
    });
    
    feedList.replaceChildren();

    if (filtered.length === 0) {
      const message = document.createElement("p");
      message.textContent = matches.length === 0
        ? "Todavía no hay partidos nuevos publicados."
        : "No hay partidos que coincidan con los filtros.";
      feedList.appendChild(message);
      return;
    }

    filtered.forEach(function (match) {
      const card = document.createElement("article");
      card.className = "match-card";

      const top = document.createElement("div");
      top.className = "match-card-top";

      const sportTag = document.createElement("span");
      sportTag.className = "sport-tag";
      sportTag.textContent = match.sport;

      const available = document.createElement("span");
      available.className = "available-tag";
      available.textContent = "Cupos disponibles";

      top.append(sportTag, available);

      const title = document.createElement("h3");
      title.textContent = "Buscamos jugadores para un partido";

      const details = document.createElement("div");
      details.className = "match-details";

      const place = document.createElement("p");
      place.textContent = "📍 " + match.neighborhood + ", Cali";

      const dateTime = document.createElement("p");
      dateTime.textContent = "📅 " + match.date + " · " + match.time;

      details.append(place, dateTime);

      const description = document.createElement("p");
      description.className = "match-description";
      description.textContent = match.description;

      const bottom = document.createElement("div");
      bottom.className = "match-card-bottom";

      const slots = document.createElement("span");
      slots.className = "slots";
      slots.textContent = "Se necesitan " + match.players + " jugadores";

      bottom.appendChild(slots);
      card.append(top, title, details, description, bottom);
      feedList.appendChild(card);
    });
  });

  filterSport.addEventListener("change", showMatches);
  filterNeighborhood.addEventListener("change", showMatches);
});
// Llevar al formulario al pulsar "Publicar partido"
  const publishButtons = document.querySelectorAll(
    '[data-view="publish"]'
  );

  publishButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      document.getElementById("publishView").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
   // Llevar a la lista de partidos
  const searchButtons = document.querySelectorAll(
    '[data-view="home"]'
  );

  searchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      document.getElementById("homeView").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });