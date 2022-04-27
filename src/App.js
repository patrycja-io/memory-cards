import "./App.css";
import { useState } from "react";

const images = [
  { src: "assets/astronaut.png" },
  { src: "assets/ball.png" },
  { src: "/assets/camera.png" },
  { src: "/assets/rocket.png" },
  { src: "/assets/hotdog.png" },
  { src: "/assets/key.png" },
  { src: "/assets/planet.png" },
  { src: "/assets/victory.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // mixmach cards

  const randomCards = () => {
    const changeCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(changeCards);
    setTurns(0);
    
  };

  console.log(cards, turns)
  return (
    <div className="App">
      <h1>Memory Cards</h1>
      <button onClick={randomCards}>Play New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src="/assets/cover.png" alt="card back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
