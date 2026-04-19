import React, { useState, useEffect } from "react";

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function Memory() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [data, setData] = useState([]);
  const [round, setRound] = useState(0)

  useEffect(() => {
    fetch(
      "https://api.thedogapi.com/v1/images/search?limit=12&include_breeds=true",
      {
        headers: {
          "x-api-key":
            "live_lChPNOqzmhiF6Qka1LKbq6f7YLqnaa4kfr2UB0omhHKUPj4bJEBtiBEXUuUKkuJJ",
        },
      },
    )
      .then((response) => response.json())
      .then((json) => {
        const modifiedData = json.map((item) => ({
          ...item,
          userClicked: false,
        }));
        setData(modifiedData);
      })
      .catch((error) => console.error(error));
  }, [round]);

  function randomize(data) {
    if (data.length === 0) {
      return [];
    }

    shuffle(data);
    const randomizedData = data.slice(0, 5);

    let anyUnClicked = false;
    for (let i = 0; i < randomizedData.length; i++) {
      if (randomizedData[i].userClicked === false) {
        anyUnClicked = true;
      }
    }
    if (anyUnClicked === true) {
      return randomizedData;
    } else {
      return randomize(data);
    }

  }

  function cardClicked(id, data, clicked) {

    if (clicked === true) {
      resetScore();
      return resetData(data);
    }

    const newData = data.map((item) => {
      if (item.id === id) {
        increaseScore();
        return { ...item, userClicked: true };
      } else {
        return item;
      }
    });

    const allClicked = newData.every(item => item.userClicked === true);

    if (allClicked) {
      alert("You Win! Great Job!!!!!")
      return setRound(round + 1);
    }

    return setData(newData);
  }

  function increaseScore() {
    return setScore(score + 1);
  }

  function resetScore() {
    if (score > highScore) {
      setHighScore(score);
      alert(`Game over! New high score! ${score}`);
    } else {
      alert(`Game over! Better luck next time :)`);
    }
    return setScore(0);
  }

  function resetData(data) {
    const newData = data.map((item) => {
      if (item.userClicked === true) {
        return { ...item, userClicked: false };
      } else {
        return item;
      }
    });

    return setData(newData);
  }

  return (
    <>
      <header>
        <h1>Dog Memory Game</h1>
        <h1>12 Dogs Per Round</h1>
        <div class="scoreBoardWrapper">
          <div class="scorewrapper">
            <div class="score">
              <h2>Score</h2>
              <h2>{score}</h2>
            </div>
            <div class="score">
              <h2>High Score</h2>
              <h2>{highScore}</h2>
            </div>
          </div>
        </div>
      </header>

      <div class="dogCardsWrapper">
        {randomize(data).map((dog, index) => (
          <div
            key={index}
            className={"dogcard"}
            onClick={() => cardClicked(dog.id, data, dog.userClicked)}
          >
            <img key={index} src={dog.url} width="180" height="180" />
            <p>
              {dog.breeds && dog.breeds.length > 0
                ? dog.breeds[0].name
                : "Unknown breed"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
export { Memory };
