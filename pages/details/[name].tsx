import { GetServerSideProps } from 'next';
import Link from 'next/link';

type PokemonType = {
  type: {
    name: string;
  };
};


type PokemonDetailsProps = {
  pokemon: {
    name: string;
    id: number;
    weight: number;
    height: number;
    abilities: { ability: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    types: PokemonType[];
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


// Define color mapping for Pokémon types
const typeColorMapping: { [key: string]: string } = {
  fire: 'text-red-500',
  water: 'text-blue-500',
  grass: 'text-green-500',
  electric: 'text-yellow-500',
  psychic: 'text-pink-500',
  ice: 'text-blue-300',
  dragon: 'text-purple-700',
  dark: 'text-gray-800',
  fairy: 'text-pink-300',
  fighting: 'text-red-700',
  flying: 'text-purple-300',
  poison: 'text-purple-500',
  ground: 'text-yellow-700',
  rock: 'text-gray-600',
  bug: 'text-green-700',
  ghost: 'text-indigo-600',
  steel: 'text-gray-400',
  normal: 'text-gray-500',
};


export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  // Get the primary type of the Pokémon to determine the color
  const primaryType = pokemon.types[0].type.name;
  const nameColorClass = typeColorMapping[primaryType] || 'text-black';

  return (
    <div className="container mx-auto p-8">
      <h1 className={`text-5xl font-bold capitalize text-center mb-8 ${nameColorClass}`}>{pokemon.name} </h1>

      {/* Card layout */}
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-center items-start mx-auto max-w-4xl w-full md:w-3/4 lg:w-1/2">
        {/* Left side with vertical images */}
        <div className="flex flex-col mr-8 text-black">
          <span className='font-bold'>Normal<img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className=" mt-5 mb-10 w-32 h-32 md:w-48 md:h-48 object-contain" /></span>
          <span className=' font-bold text-yellow-500'>Shiny<img src={pokemon.sprites.other['official-artwork'].front_shiny} alt={`${pokemon.name} shiny`} className="w-32 h-32 md:w-48 md:h-48 object-contain" /></span>
        </div>

        {/* Right side with details */}
        <div className="text-left text-black border-l-4 p-3 ">
          <ul className="text-lg capitalize space-y-4 ">
            <li><strong>ID:</strong> {pokemon.id}</li>
            <li><strong>Height:</strong> {pokemon.height}</li>
            <li><strong>Weight:</strong> {pokemon.weight}</li>
            <li><strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</li>
            <li><strong>Stats:</strong>            
                {pokemon.stats.map(stat => (
                  <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                ))}              
            </li>

            <li className="px-4, py-1"><strong>Type:</strong></li>
          </ul>

      {/* Pokémon Type Pills */}
      <div className="flex space-x-4 my-1">
            {pokemon.types.map((typeInfo, index) => {
              const typeName = typeInfo.type.name;
              const typeColorClass = typeColorMapping[typeName] || 'bg-gray-500'; // Default color if type not found
              return (
                <span
                  key={index}
                  className={`inline-block px-6 py-1 rounded-full font-bold bg-black ${typeColorClass}`}
                >
                  {typeName}
                </span>
              );
            })}
          </div>
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
if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const pokemon = await response.json();
  return {
    props: {
      pokemon,
    },
  };
};
