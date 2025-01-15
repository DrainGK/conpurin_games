import React, { useEffect, useState } from 'react'
import { PlayerType, TopType } from '../utils/Types';
import { useNavigate, useParams } from 'react-router-dom';
import { shuffleArray, updateEloForBoth } from '../utils/utils';

const Top: React.FC = () => {
  
  const { Id } = useParams<{Id: string}>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topData, setTopData] = useState<TopType | null>(null);
  const [playerArray, setPlayerArray] = useState<PlayerType[]>([]);
  const [turn, setTurn] = useState<number>(1);
  const [topPlayer, setTopPlayer] = useState<PlayerType | null>(null);
  const navigate = useNavigate();
      
  console.log('Id from the URL:', Id);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch("/data.json");
                if (!response.ok){
                    throw new Error("Erreur while fetching data");
                }
                const data = await response.json();
                console.log(data.Tops[1].id);                
                
                const foundTop = data.Tops.find(
                    (top: TopType) => top.id === parseInt(Id ?? "", 10)
                );

                if(!foundTop){
                    throw new Error("Top not found")
                };
                setTopData(foundTop);
                console.log(data.Tops[0].player);
                setPlayerArray(foundTop.player);                
            } catch(err){
                setError((err as Error).message)
            } finally {
                setIsLoading(false);
            }
        }

        
        fetchData();
    },[Id]);

    const startDuel = (winner: PlayerType, loser:PlayerType) => {
      if(turn <= 15){
        console.log("winner before: elo ",winner.name + winner.elo);
            console.log("loser before: elo ",loser.name + loser.elo);
            updateEloForBoth(winner, loser);
            console.log("winner after: elo ",winner.name + winner.elo);
            console.log("loser after: elo ", loser.name + loser.elo);
            setTurn(turn+1);
            setPlayerArray(shuffleArray(playerArray))
            setTopPlayer(findHighestElo(playerArray))
      }
    }

    const findHighestElo = (players: PlayerType[]): PlayerType | null => {
      const maxElo = Math.max(...players.map(player => player.elo));
      return players.find(player => player.elo === maxElo) || null;
  }

    shuffleArray(playerArray);
    console.log(playerArray);
    
      if (isLoading) return <p className="text-center">Chargement des données...</p>;
      if (error) return <p className="text-red-500 text-center">{error}</p>;
  return turn <= 10? (
    <section className='h-screen w-screen flex flex-col items-center'>
      <h3 className='font-raleway font-bold text-7xl mt-20 mb-10'>
            {topData?.title}
      </h3>
      <div className='h-full flex font-raleway font-bold text-xl gap-10 justify-center items-center w-full'>
            <div className='w-full flex flex-col items-center justify-center cursor-pointer'>
              <p className='mb-2'>{playerArray[0].name} ⭐</p>
              <img className='w-[300px] h-[200px] object-contain object-top rounded-s-xl' src={playerArray[0].img} onClick={() => startDuel(playerArray[0], playerArray[1])} alt={playerArray[0].name} 
              />
            </div>

            <p className='text-4xl'>🆚</p>

            <div className='w-full flex flex-col items-center justify-center cursor-pointer'>
              <p className='mb-2'>⭐ {playerArray[1].name}</p>
              <img className='w-[300px] h-[200px] object-contain ' src={playerArray[1].img} onClick={() => startDuel(playerArray[1], playerArray[0])} alt={playerArray[1].name} 
              />
            </div>
        </div>
    </section>
  ):(
    <div className='w-screen h-screen flex flex-col items-center gap-y-10'>
    <h3 className='font-raleway font-bold text-7xl mt-20 mb-10'>
            {topData?.title}
    </h3>
    <img className='w-[300px] h-[200px] object-contain ' src={topPlayer?.img} alt={topPlayer?.name} />
    <p className='font-railway font-bold text-5xl text-yellow-400'>{topPlayer?.name}</p>
    <div className='flex flex-col gap-y-5 font-bold text-xl'>
      <button className='h-[50px] w-[250px] bg-yellow-400 text-black  rounded-3xl'
      onClick={() => window.location.reload()}
      >
        again ?
      </button>
      <button className='h-[50px] w-[250px] bg-yellow-400 text-black  rounded-3xl'
      onClick={() => navigate("/")}
      >
        home
      </button>
    </div>
    </div>
  )
}

export default Top