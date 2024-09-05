import { GetServerSideProps } from 'next';
import Link from 'next/link';

type PokemonDetailsProps = {
  pokemon: {
    name: string;
    id: number;
    weight: number;
    height: number;
    abilities: { ability: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
          front_shiny: string;
        };
      };
    };
  };
};

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold capitalize text-center mb-8">{pokemon.name}</h1>

      {/* Card layout */}
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-center  items-start">
        {/* Left side with vertical images */}
        <div className="flex flex-col mr-8">
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="mb-4 w-48 h-48" />
          <img src={pokemon.sprites.other['official-artwork'].front_shiny} alt={`${pokemon.name} shiny`} className="w-48 h-48" />
        </div>

        {/* Right side with details */}
        <div className="text-left text-black border-l-4 p-3 ">
          <ul className="text-lg space-y-4 ">
            <li><strong>ID:</strong> {pokemon.id}</li>
            <li><strong>Height:</strong> {pokemon.height}</li>
            <li><strong>Weight:</strong> {pokemon.weight}</li>
            <li><strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</li>
            <li><strong>Stats:</strong>
              <ul className="ml-4">
                {pokemon.stats.map(stat => (
                  <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Back button */}
      <div className="mt-8 text-center">
        <Link href="/">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Back</button>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params as { name: string };
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await response.json();

  return {
    props: {
      pokemon,
    },
  };
};
