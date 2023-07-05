import React from 'react'
import "./Header.css";
import { TextField, ThemeProvider, createMuiTheme,MenuItem } from '@mui/material';
import countries from "../../data/category";
import { debounce } from "lodash";


const Header=({LightTheme,category,setCategory,word,setWord,setMeanings})=> {
const darkTheme=createMuiTheme({
  palette:{
    primary:{
      main: LightTheme?"#000":"#fff",
     },
      type : LightTheme?"light":"dark",
    },
})
const handleChange=(e)=>{
  setCategory(e.target.value);
  setWord("");
  setMeanings([]);
}
const handleText=debounce((text)=>{
  setWord(text);
},500)
  return (
    <div className='header'>
        <span className='title'>{word ? word :"DICT_APP"}</span>
      <div className='input'>
      <ThemeProvider theme={darkTheme}>
        <TextField id="filled-basic" label="Search a Word" variant="standard" className='search' onChange={(e)=>handleText(e.target.value)} />
        <TextField id="standard-basic" label="Language" variant="standard" className="select" onChange={(e) => handleChange(e)}>
        {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
        </TextField>
      </ThemeProvider>
        

      </div>
      
    </div>
  )
}

export default Header;
