import { useEffect, useState } from "react";
import {Container, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

import { grey } from "@mui/material/colors";
import './App.css';
import Definitions from "../src/components/Definitions/Definitions"
import Header from "../src/components/Header/Header"
import Footer from "./components/Footer/Footer";
import axios from "axios";


function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [LightTheme, setLightTheme] = useState(false);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(meanings);
  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category]);

  const PurpleSwitch = styled(Switch)(({ theme }) => ({
    switchBase: {
      color: theme.palette.grey[50],
      '&$checked': {
        color: theme.palette.grey[900],
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.grey[500],
      },
    },
    checked: {},
    track: {},
  }));


  return (
    <div className="App"
    style={{
      height: "100vh",
      backgroundColor: LightTheme ? "#fff" : "#282c34",
      color: LightTheme ? "black" : "white",
      transition: "all 0.5s linear",
    }}
    >
      <Container
       maxWidth="md"
       style={{
         display: "flex",
         flexDirection: "column",
         height: "100vh",
         justifyContent: "space-evenly",
       }}
      >
        <div  style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}>
        <span>{LightTheme ? "Dark" : "Light"} Mode</span>
          <PurpleSwitch
            checked={LightTheme}
            onChange={() => setLightTheme(!LightTheme)}
          />
        </div>
        <Header 
         setWord={setWord}
         category={category}
         setCategory={setCategory}
         word={word}
         setMeanings={setMeanings}
         LightTheme={LightTheme}/>
         {meanings && (
          <Definitions
            meanings={meanings}
            word={word}
            LightTheme={LightTheme}
            category={category}
          />
        )}
      </Container>
        <Footer />
    </div>
  );
}

export default App;
