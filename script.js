const animalTemplate = document.getElementById("animal-template");
const cardContainer = document.getElementById("card-container");
const addAnimalBtn = document.getElementById("add-animal-btn");

let animals = [];

search.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    animals.forEach(animal => {
        const isVisible = animal.specie.toLowerCase().includes(value) ||
            animal.food.toLowerCase().includes(value)
        animal.element.classList.toggle("hide", !isVisible)
    })
})
axios.get("http://localhost:3000/Animals").then(res => {
    animals = res.data.map(animal => {
        const card = animalTemplate.content.cloneNode(true).children[0];
        card.children[0].innerHTML = animal.species;
        card.children[1].innerHTML = `favorite food: ${animal.food}`;
        card.children[2].innerHTML = `has ${animal.legs} legs`;
        cardContainer.append(card);
        card.querySelector(".delete-button").addEventListener("click", () => {
            const confirmDeletion = confirm(`Are you sure you want to delete ${animal.species}?`);
            confirmDeletion && axios.delete(`http://localhost:3000/Animals/${animal.id}`);
        });
        return { specie: animal.species, food: animal.food, legs: animal.legs, element: card };
    });
})


addAnimalBtn.addEventListener("click", () => {
    const species = prompt("Enter the species of the new animal");
    const food = prompt("Enter the food of the new animal");
    const legs = prompt("Enter the number of legs of the new animal");
    const newAnimal = {
        species: species,
        food: food,
        legs: legs,
    };
    animals.push(newAnimal);
    axios.post("http://localhost:3000/Animals", newAnimal)
});