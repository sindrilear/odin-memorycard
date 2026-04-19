import React, { useState, useEffect } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


function Memory() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.thedogapi.com/v1/images/search?limit=8&include_breeds=true', {
      headers: {
        'x-api-key': 'live_lChPNOqzmhiF6Qka1LKbq6f7YLqnaa4kfr2UB0omhHKUPj4bJEBtiBEXUuUKkuJJ'
      }
    })
      .then(response => response.json())
      .then(json => {
        const modifiedData = json.map(item => ({
          ...item,
          userClicked: false
        }));
        setData(modifiedData)
      })
      .catch(error => console.error(error))
  }, []);

/*   useEffect(() => {
    const testData = [
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false},
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png", userClicked: false}
    ];

    setData(testData);
  }, []); */

  function randomize(data) {
    shuffle(data);
    const randomizedData = data.slice(0, 9);

    return randomizedData;
  }

  function cardClicked(id, data) {
    const dataSize = data.length;
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, userClicked: true }; 
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
        <div class="scoreBoardWrapper">
          <div class="scorewrapper">
            <div class="score">
              <h2>Score</h2>
              <h2>0</h2>
            </div>
            <div class="score">
            <h2>High Score</h2>
            <h2>0</h2>
            </div>
          </div>
        </div>
      </header>

      <div class="dogCardsWrapper">
        {randomize(data).map((dog, index) => (
        <div key={index} className={`dogcard ${index}`} onClick={() => cardClicked(dog.id, data)}>
            <img key={index} src={dog.url} width="180" height="180"/>
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
