import { useState, useEffect } from "react";

export function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const pets = fetch("http://localhost:3000/pets");
    pets.then(
      (res) =>
        res.json().then((data) => {
          console.info("response", data);
          setPets(data);
        }),
      (err) => {
        console.info("request error", err);
      }
    );
  }, []);


    return (
      <div className="p-4 bg-blue-200">
        <p className="text-xl text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A sint eaque iste minima alias in totam blanditiis, necessitatibus ullam quam optio fuga inventore illo tempore consequuntur delectus repellat vel nam.
        </p>

        <div>
            <div>
              Pets
            </div>
            {
              pets.map(pet => (<div key={pet.name}>{pet.name}</div>))
            }
            
          </div>
      </div>
    );
  }
  