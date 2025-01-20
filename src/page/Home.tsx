import React, { useEffect, useState } from 'react'
import { TopType } from '../utils/Types';
import Card from '../components/Card';
import { Link } from 'react-router-dom';


const Home:React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [topData, setTopData] = useState<TopType[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch("/data.json");
                if (!response.ok){
                    throw new Error("Erreur while fetching data");
                }
                const data = await response.json();
                setTopData(data.Tops || []);
                console.log(data);
                
            } catch(err){
                setError((err as Error).message)
            } finally {
                setIsLoading(false);
            }
        }

        
        fetchData();
    },[]);

    if (isLoading) return <p className="text-center">Chargement des données...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className='flex items-center justify-center relative h-screen w-screen '>

        <img className='w-full h-[150px] fixed top-0 z-0' src="./img/topbanner.png" alt="top banner" />
        <img className='object-cover h-[300px] fixed top-0 left-[40%] z-1 mx-auto mt-5' src="./img/Title.png" alt="titre" />
        <div>
            <div className=' flex relative z-10 mb-5 items-center'>
                <p className='text-7xl z-10'>🎁</p>
                <p className="absolute font-railway font-bold text-white text-4xl bg-black bg-opacity-50 rounded-r-lg flex items-center py-3 px-8 left-16"
                style={{ transform: 'rotate(-2deg)' }}
                >プレゼント</p>
            </div>
            <Card
                title={topData[0].title}
                desc={topData[0].desc}
                img={topData[0].img}
                index={0}
            />
        </div>

        <div className='max-w-[900px] flex flex-1 flex-wrap mt-60 gap-5 justify-center items-start'>
            {topData.map((data: TopType, index: number)=> (
                <Link
                    to={`/top/${data.id}`}
                >
                    <Card
                    key={data.id}
                        title={data.title}
                        desc={data.desc}
                        img={data.img}
                        index={index}
                    />
                </Link>
            ))}
        </div>
    </div>
  )
}
export default Home