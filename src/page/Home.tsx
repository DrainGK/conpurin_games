import React, { useEffect, useState } from 'react'
import { CardType, TopType } from '../utils/Types';
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
    <div className='flex items-center justify-center relative h-screen gap-x-5 w-screen '>
        <img className='w-full h-[150px] fixed top-0 z-0' src="./img/topbanner.png" alt="top banner" />
        <img className='object-cover h-[300px] fixed top-0 left-[40%] z-1 mx-auto mt-5' src="./img/Title.png" alt="titre" />
        {topData.map((data: TopType)=> (
            <Link
                to={`/top/${data.id}`}
            >
                <Card
                key={data.id}
                    title={data.title}
                    desc={data.desc}
                    img={data.img}
                />
            </Link>
        ))}
    </div>
  )
}
export default Home