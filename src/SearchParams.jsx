import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
 
const SearchParams = () => {
    const [location, setLocation] = useState("Seattle, WA");
    // const [location "<== current state!!!", setLocation "<== updater function!"] = useState("Seattle, WA");
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "Dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

    useEffect(() => {
        // pet.breeds("dog").then(console.log, console.error);
        setBreeds([]);
        setBreed("");

        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({name}) => name);
            setBreeds(breedStrings);
        }, console.error)
    }, [animal, setBreed, setBreeds]); // <= leave blank to run only once

    return (
        <div className="search-params">
            <form action="">
                <label htmlFor="location">
                    Location
                    <input id="location" 
                            value={location}
                            placeholder="Location" 
                            onChange={event => setLocation(event.target.value)}/>
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchParams;