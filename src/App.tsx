import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {json} from "stream/consumers";
import {Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface todoInterface{
    id:string;
    name:string;
    isdone:boolean;

}

export function App() {
  const [todoes, setTodoes]= useState<todoInterface[]>([]);
  const [inputVal, setInputVal] = useState<string>('')
 const getData = async ()=>{
    const data = await fetch('http://localhost:3001/todo');
    const dataArray = await data.json();
    console.log(dataArray);
    setTodoes(dataArray);
  }
  const addToDo = async ()=>{
      await fetch(`http://localhost:3001/todo`,{
          method: "POST",
          body: JSON.stringify({name: inputVal}),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      });

      await getData();
  }

  const dellToDo = async (id:string )=>{
      await fetch(`http://localhost:3001/todo/${id}`,{
          method: "DELETE",
          body: JSON.stringify({id}),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      });
      await getData();
  }
  useEffect(()=>{getData()},[])
    const handeClick=async (data:string)=>{
        console.log(data);
        await fetch(`http://localhost:3001/todo/${data}`,{
            method: "PATCH"
        });
       await getData();
    }
  return (
      <>

          <Box sx={{margin: 'auto', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <h1 style={{textAlign: "center"}}>To do list </h1>
          <List>
              {todoes.map(item=>(<ListItemButton>
                  <ListItemText style={{color: item.isdone? 'red': "blue", textDecoration: item.isdone? 'line-through': "none" }} onClick={()=>{handeClick(item.id)}} primary={`${item.name}`} />
                  <ListItemIcon onClick={()=>{dellToDo(item.id)}}>
                      <DeleteForeverIcon />
                  </ListItemIcon>
              </ListItemButton>))}
          </List>
          <TextField value={inputVal} onChange={e=>setInputVal(e.target.value)} id="outlined-basic" label="TASK" variant="outlined" />
          <Button onClick={()=> addToDo()} variant="contained" endIcon={<AddIcon />}>
              ADD
          </Button>
          </Box>
      </>
  );
}


