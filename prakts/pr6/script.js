const requestURL = 'https://semegenkep.github.io/json/example.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  const superHeroes = request.response;
  console.log(superHeroes);
  populateHeader(superHeroes);
  showHeroes(superHeroes);
};
function populateHeader(data) {
  const header = document.querySelector('header');
  const h1 = document.createElement('h1');
  h1.textContent = data.squadName;
  header.appendChild(h1);
  const para = document.createElement('p');
  para.textContent = `Hometown: ${data.homeTown} // Formed: ${data.formed}`;
  header.appendChild(para);
}
function showHeroes(data) {
    const section = document.querySelector('section');
    const heroes = data.members;
    heroes.forEach(hero => {
      const article = document.createElement('article');
      const h2 = document.createElement('h2');
      h2.textContent = hero.name;
      article.appendChild(h2);
      const para1 = document.createElement('p');
      para1.textContent = `Secret identity: ${hero.secretIdentity}`;
      article.appendChild(para1);
      const para2 = document.createElement('p');
      para2.textContent = `Age: ${hero.age}`;
      article.appendChild(para2);
      const powersTitle = document.createElement('p');
      powersTitle.textContent = "Superpowers:";
      article.appendChild(powersTitle);
      const powersList = document.createElement('ul');
      hero.powers.forEach(power => {
        const listItem = document.createElement('li');
        listItem.textContent = power;
        powersList.appendChild(listItem);
      });
      article.appendChild(powersList);
      section.appendChild(article);
    });
  }  