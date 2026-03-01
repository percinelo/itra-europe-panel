document.addEventListener("DOMContentLoaded", () => {
  const countrySelect = document.getElementById("country");
  const tableBody = document.getElementById("raceTableBody");
  const sortBtn = document.getElementById("sortDate");
  const distanceSelect = document.getElementById("distance");

  let races = [];
  let sortAsc = true;

  fetch("./races.json")
    .then(res => res.json())
    .then(data => {
      races = data;
      populateCountries(races);
      renderTable(races);
    });

  function populateCountries(data) {
    const countries = [...new Set(data.map(r => r.country))];
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  }

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(race => {
      const row = `
        <tr>
          <td>${race.name}</td>
          <td>${race.country}</td>
          <td>${race.date}</td>
          <td>${race.distance} km</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }

  function applyFilters() {
    let filtered = [...races];

    const selectedCountry = countrySelect.value;
    const selectedDistance = distanceSelect.value;

    if (selectedCountry !== "all") {
      filtered = filtered.filter(r => r.country === selectedCountry);
    }

    if (selectedDistance !== "all") {
      filtered = filtered.filter(r => r.distance >= parseInt(selectedDistance));
    }

    renderTable(filtered);
  }

  countrySelect.addEventListener("change", applyFilters);
  distanceSelect.addEventListener("change", applyFilters);

  sortBtn.addEventListener("click", () => {
    races.sort((a, b) => 
      sortAsc 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    sortAsc = !sortAsc;
    renderTable(races);
  });
});
add fetch and filtering logic

