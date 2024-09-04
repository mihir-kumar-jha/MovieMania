import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title="Popular Shows", category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();


  
  // fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));
  


  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`)
    .then(response => response.json())
    .then(response => setApiData(response.results))

    cardsRef.current.addEventListener('wheel', handleWheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={{ pathname: `/player/${card.id}` }} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
