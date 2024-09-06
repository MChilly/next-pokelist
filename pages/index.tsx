import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Pokemon = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state
  const router = useRouter(); // Router for navigation

  // Fetch the first 20 Pokémon on initial render
  useEffect(() => {
    fetchInitialPokemon('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  }, []);


  const fetchInitialPokemon = async (url: string) => {
    const response = await fetch(url);
    const data: PokemonListResponse = await response.json();
    // Set the first 20 Pokémon and the next URL for further loading
    setPokemonList(data.results);// Initially set the first 20 Pokémon
    setNextUrl(data.next);// Set the next URL for loading more Pokémon
  };

  const fetchMorePokemon = async () => {
    if (nextUrl) {
      const response = await fetch(nextUrl);
      const data: PokemonListResponse = await response.json();
      // Append the next set of Pokémon to the list without overwriting the existing list
      setPokemonList(prev => [...prev, ...data.results]);
      setNextUrl(data.next);// Update the next URL for loading more Pokémon
    }
  };

    // Handle search submission
    const handleSearch = (event: React.FormEvent) => {
      event.preventDefault();
      if (searchTerm.trim() !== '') {
        router.push(`/details/${searchTerm.toLowerCase()}`);
      }
    };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      {/* Pokemon Logo */}
      <div className="flex flex-col items-center mb-4">
        <h1 className="flex justify-center p-8">
          <img src={`./International_Pokémon_logo.svg`} alt="Pokémon Logo"/>
        </h1>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex text-black">
          <input
            type="text"
            value={searchTerm} // Use searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            placeholder="Search for a Pokémon"
            className="px-10 py-2 border rounded mr-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Search
          </button>
        </form>
      </div>


      <table className="min-w-full bg-black">
        <thead>
          <tr>
            <th className="py-2 text-2xl">Pokemon ID</th>
            <th className="py-2 text-2xl">Pokemon Image</th>
            <th className="py-2 text-2xl">Pokemon Name</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 text-center">{index + 1}</td>
              <td className="py-2 text-center">
              <Link href={`/details/${pokemon.name}`}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                  alt={pokemon.name}
                  className="w-10 h-10 mx-auto"
                />
                </Link>
              </td>
              <td className="py-2 text-center font-semibold capitalize">
                <Link href={`/details/${pokemon.name}`} className="hover:text-yellow-500">
                  {pokemon.name}
                </Link>
              </td>
              <td className="py-2 text-center">
                <Link href={`/details/${pokemon.name}`}>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {nextUrl && (
        <button 
          onClick={fetchMorePokemon} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
          Load More
        </button>
      )}
    </div>
  );
}
