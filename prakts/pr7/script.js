const requestURL = 'https://semegenkep.github.io/json/example.json';
let translations = {};

document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("language-selector");

  loadLanguage("en").then(() => {
    fetchSuperHeroes();
  });

  languageSelector.addEventListener("change", () => {
    const selectedLanguage = languageSelector.value;
    loadLanguage(selectedLanguage).then(() => {
      fetchSuperHeroes();
    });
  });
});

async function loadLanguage(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    translations = await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function fetchSuperHeroes() {
  fetch(requestURL)
    .then(response => response.json())
    .then(superHeroes => {
      populateHeader(superHeroes);
      showHeroes(superHeroes);
    })
    .catch(error => console.error("Error loading heroes:", error));
}

function populateHeader(data) {
  const header = document.querySelector('header');
  header.innerHTML = '';

  const h1 = document.createElement('h1');
  h1.textContent = translations.squadName || data.squadName;
  header.appendChild(h1);

  const para = document.createElement('p');
  para.textContent = `${translations.homeTown || "Hometown"}: ${data.homeTown} // ${translations.formed || "Formed"}: ${data.formed}`;
  header.appendChild(para);
}

function showHeroes(data) {
  const section = document.querySelector('section');
  section.innerHTML = '';

  data.members.forEach(hero => {
    const article = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.textContent = translations.heroes[hero.name] || hero.name;
    article.appendChild(h2);

    const para1 = document.createElement('p');
    para1.textContent = `${translations.secretIdentity || "Secret identity"}: ${hero.secretIdentity}`;
    article.appendChild(para1);

    const para2 = document.createElement('p');
    para2.textContent = `${translations.age || "Age"}: ${hero.age}`;
    article.appendChild(para2);

    const powersTitle = document.createElement('p');
    powersTitle.textContent = translations.superpowers || "Superpowers";
    article.appendChild(powersTitle);

    const powersList = document.createElement('ul');
    hero.powers.forEach(power => {
      const listItem = document.createElement('li');
      listItem.textContent = translations.powers[power] || power;
      powersList.appendChild(listItem);
    });

    article.appendChild(powersList);
    section.appendChild(article);
  });
}
