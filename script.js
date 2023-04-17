const animalTemplate = document.getElementById("animal-template");
const cardContainer = document.getElementById("card-container");

let animals = [];

search.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    animals.forEach(animal => {
        const isVisible = animal.specie.toLowerCase().includes(value)|| 
        animal.food.toLowerCase().includes(value)
        animal.element.classList.toggle("hide",!isVisible)
    })
})

axios.get("http://localhost:3000/Animals").then(res => {
   animals = res.data.map(animal => {
        const card = animalTemplate.content.cloneNode(true).children[0];
        card.children[0].innerHTML = animal.species;
        card.children[1].innerHTML = `favorite food:${animal.food}`;
        card.children[2].innerHTML = `has ${animal.legs} legs`;
        cardContainer.append(card);
        return {specie: animal.species, food: animal.food, legs: animal.legs, element: card}
    });
})