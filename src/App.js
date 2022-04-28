import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const images = [
  { src: "assets/astronaut.png", matched: false },
  { src: "assets/ball.png", matched: false },
  { src: "/assets/camera.png", matched: false },
  { src: "/assets/rocket.png", matched: false },
  { src: "/assets/hotdog.png", matched: false },
  { src: "/assets/key.png", matched: false },
  { src: "/assets/planet.png", matched: false },
  { src: "/assets/victory.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(null);

  // mixmach cards

  const randomCards = () => {
    const changeCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(changeCards);
    setTurns(0);
  };

  const handleChoiceFunction = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
   
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            }else{
              return card
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo]);

  

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false)
  };

 useEffect(() =>{
randomCards()
 },[])


  return (
    <div className="App">
      <h1>Memory Cards</h1>
      <button onClick={randomCards}>Play New Game</button>
      <p>Turns: {turns}</p>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            disabled={disabled}
            handleChoice={handleChoiceFunction}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
