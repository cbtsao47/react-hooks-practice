import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http";
import Summary from "./Summary";

const Character = props => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useHttp(`http://swwapi.co/api/people${props.selectedChar}`, []);
  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log("shouldComponentUpdate");
  //     return (
  //       nextProps.selectedChar !== this.props.selectedChar ||
  //       nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //       nextState.isLoading !== this.state.isLoading
  //     );
  //   }

  //   componentDidUpdate(prevProps) {
  //     console.log("Component did update");
  //     if (prevProps.selectedChar !== props.selectedChar) {
  //       fetchData();
  //     }
  //   }

  const fetchData = () => {
    console.log(
      "Sending Http request for new character with id " + props.selectedChar
    );
    setIsLoading(true);
    fetch("https://swapi.co/api/people/" + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log("cdm");
  }, []);
  useEffect(() => {
    fetchData();
    return () => {
      console.log("cleaning up...");
    }; //clean up function executed before the next useEffect(the same one)
  }, [props.selectedChar]);
  //   componentWillUnmount() {
  //     console.log("Too soon...");
  //   }
  useEffect(() => {
    return () => {
      console.log("unmounting");
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default Character;
