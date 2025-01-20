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
  const maxTurn: number = 15;
      
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
      if(turn <= maxTurn){
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

  return turn <= maxTurn? (
    <section className='h-screen w-screen flex flex-col items-center relative'>

      <img className='w-full h-[150px] fixed top-0 z-0' src="/img/topbanner.png" alt="top banner" />

      <div className='w-fit z-10'>
        <div className='rounded-t-3xl px-20 py-10 mt-20 bg-white'>
          <h3 className='font-raleway font-bold text-5xl'
           style={{ transform: 'rotate(-2deg)' }}
          >
                {topData?.desc}
          </h3>
        </div>
        <div className='w-full h-3 bg-gray-200'>
          <div className='bg-[#FF9800] h-3'
          style={{ width: `calc(${(turn / maxTurn) * 100}%)` }}
          />
        </div>
      </div>
      <div className='h-full flex font-raleway font-bold text-white text-xl gap-10 justify-center items-center w-full'>
            <div className='w-full flex flex-col items-center justify-center cursor-pointer'>
            <div className='w-[500px] mb-2 text-3xl flex gap-x-2 justify-start'>
                <p className=''>⭐</p>
                <p>{playerArray[0].name}</p>
              </div>
              <img className='w-[500px] h-[400px] object-contain object-top rounded-s-xl bg-radial-orange shadow-2xl animate__animated animate__slow animate__pulse animate__infinite' src={playerArray[0].img} onClick={() => startDuel(playerArray[0], playerArray[1])} alt={playerArray[0].name} 
              style={{
                clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)"
              }}
              />
            </div>

            <p className='text-7xl'>🆚</p>

            <div className='w-full flex flex-col items-center justify-center cursor-pointer'>
              <div className='w-[500px] mb-2 text-3xl flex gap-x-2 justify-end'>
                <p>{playerArray[1].name}</p>
                <p className=''>⭐</p>
              </div>
              <img className='w-[500px] h-[400px] object-contain rounded-r-xl bg-radial-orange shadow-2xl animate__animated animate__slow animate__pulse animate__infinite' src={playerArray[1].img} onClick={() => startDuel(playerArray[1], playerArray[0])} alt={playerArray[1].name} 
              style={{
                clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)", // Diagonale côté gauche
              }}
              />
            </div>
        </div>
    </section>
  ):(
    <div className='w-screen h-screen flex flex-col items-center gap-y-10 relative'>
      <img className='w-full h-[150px] fixed top-0 z-0' src="/img/topbanner.png" alt="top banner" />
      <div className='w-fit z-10'>
        <div className='rounded-t-3xl px-20 py-10 mt-20 bg-white'>
          <h3 className='font-raleway font-bold text-5xl'
           style={{ transform: 'rotate(-2deg)' }}
          >
                {topData?.desc}
          </h3>

          </div>
            <img className='w-full h-[350px] object-cover object-top bg-radial-orange' src={topPlayer?.img} alt={topPlayer?.name} />
      </div>
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