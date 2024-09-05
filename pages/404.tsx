import Link from 'next/link';

export default function NotFound() {
    return (
      <div className="container mx-auto p-8 text-center ">
        <h1 className="text-5xl text-red font-bold m-4">404 - Pokémon Not Found</h1>
        <div className="flex justify-center items-center m-8">
        <img src={`/pikachu_crying.jpg`} alt="Pokémon 404 page"/>
        </div>
       
        <p className="text-lg m-8 ">The Pokémon you are looking for <span className="text-red">does not exist</span>.</p>
        <Link href="/">
          <button className="px-4 py-2 bg-green-500  rounded">Go Back</button>
        </Link>
      </div>
    );
  }
  