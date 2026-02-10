import { useContext, useRef, useState } from "react";
import { DataContext } from "../../context/CreateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ListItem {
  name: string | number;
  url: string;
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      showdown: {
        front_default: string;
      };
    };
  };
}

export default function Home() {
  const { listaDb } = useContext(DataContext) as { listaDb: ListItem[] };
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const card = useRef<HTMLDivElement>(null);

  const handleClick = async (url: string) => {
    setPokemon(null); // Limpa o estado antes de buscar um novo Pokémon

    await fetch(url)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error("Error fetching data:", error));

    if (card.current) {
      card.current.setAttribute("open", "");
    }
  };

  return (
    <div className="page home-page px-2 pb-2.5 bg-blue-100 items-center flex flex-col min-h-screen">
      <h1 className="text-5xl mb-10 pt-2.5 text-blue-900 bg-blue-100 w-full text-center sticky top-0">
        Pokemons
      </h1>
      <div ref={card} className="modal pokemon-modal bg-[rgba(0,0,0,0.5)] md:hidden flex items-center! justify-center!">
        {pokemon && (
          <div className="flex flex-col items-center p-4 gap-4 bg-white rounded shadow-md min-w-85 min-h-85 relative ">
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute right-2 top-3"
              onClick={() => { 
                card.current?.removeAttribute("open");
                setPokemon(null)
              }}
            />
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-60 h-60 animate-(--show-top)"
            />
            <h2 className="text-2xl">{pokemon.name}</h2>
          </div>
        )}
      </div>
      <div className="flex items-start gap-2.5">
        <ul className="flex justify-around flex-wrap gap-2 p-2.5 overflow-y-auto max-h-120">
          {listaDb &&
            listaDb.map((item: ListItem, index: number) => (
              <li
                key={item.name}
                className="flex flex-col shadow-md p-2 rounded bg-white "
              >
                <span className="flex justify-between">
                  Nome: {item.name} <p>{index + 1}</p>
                </span>
                <hr className="my-1 border-b-2" />
                <a
                  className="text-blue-600 hover:underline!"
                  href={item.url}
                  target="_blank"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.url);
                  }}
                >
                  {item.url}
                </a>
              </li>
            ))}
        </ul>

        {pokemon && (
          <div className="md:flex flex-col items-center p-4 gap-4 bg-white rounded shadow-md min-w-65 min-h-65 relative hidden">
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute right-2 top-3"
              onClick={() => setPokemon(null)}
            />
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-60 h-60 animate-(--show-top)"
            />
            <h2 className="text-2xl">{pokemon.name}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
