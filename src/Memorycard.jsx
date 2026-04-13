import React, { useState, useEffect } from "react";

function Memory() {

  const [data, setData] = useState([]);

  /* useEffect(() => {
    fetch('https://api.thedogapi.com/v1/images/search?limit=2&include_breeds=true', {
      headers: {
        'x-api-key': 'live_lChPNOqzmhiF6Qka1LKbq6f7YLqnaa4kfr2UB0omhHKUPj4bJEBtiBEXUuUKkuJJ'
      }
    })
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
  }, []); */

  useEffect(() => {
    const testData = [
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" },
      { url: "https://cdn2.thedogapi.com/images/mVTsbAG4B.png" }
    ];

    setData(testData);
  }, []);

  console.log(data);
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
        {data.map((dog, index) => (
        <div key={index} className={`dogcard ${index}`}>
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
