import { useEffect, useState } from "react";
import { DataContext } from "./CreateContext";

const getData = async (ref:string, set:(data: object) => void) => {
  await fetch(ref)    .then((response) => response.json())
    .then((data) => set(data.results))
    .catch((error) => console.error("Error fetching data:", error));
};

export function DataProvider({ children }:{ children: React.ReactNode }) {
  const [listaDb, setlistaDb] = useState<object | undefined>(undefined);
  
  const [colorMode, setColorMode] = useState(true);

  useEffect(() => {
    getData("https://pokeapi.co/api/v2/pokemon", setlistaDb);
  }, []);

  const value = {
    colorMode,
    setColorMode,
    listaDb,
    setlistaDb,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
