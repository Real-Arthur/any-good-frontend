import React, { useState } from 'react';
import PersonPhotos from './PersonPhotos'
import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(() => ({
    modal: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
    },
    paper: {
        border: '2px solid #000',
        backgroundColor: '#282c34',
        color: 'white',
        margin: 'auto'
      // boxShadow: theme.shadows[5],
      // padding: theme.spacing(2, 4, 3),
    },
  }));

function PersonList(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [score, setScore] = useState(0);
    const handleOpen = () => {
        console.log('person', props.id);
        fetch(`/search/${props.id}`).then(res => res.json().then(data => {
            console.log('data', data);
            setScore(data)
        }));
        setOpenModal(true)  
    };
    const handleClose = () => {
        setOpenModal(false)
        setScore(0)
    };
    const details = (
        <Paper className={classes.paper} direction="column">     
            <PersonPhotos personPhoto={props.personPhoto}/>
            <p>Score: {score}</p>
            {score >= 7.0 && <p>Whoa! {props.thing} is amazing!</p>}
            {score >= 6.75 && score < 7.0 && <p>{props.thing} is very good!</p>}
            {score >= 6.5 && score < 6.75 && <p>{props.thing} is good!</p>}
            {score >= 6.25 && score < 6.5 && <p>{props.thing} is fine.</p>}
            {score >= 6.0 && score < 6.25 && <p>{props.thing} is not bad!</p>}
            {score >= 5.75 && score < 6.0 && <p>{props.thing} sucks!</p>}
            {score < 5.75 && score > 0 && <p>Don't waste your time. {props.thing} is terrible.</p>}
            {score === 0 && <p>{props.thing} is a mystery.</p>}
            <Button variant="contained" color="primary" onClick={()=> handleClose()}>Exit</Button>
        </Paper>
    );
    // console.log('props', props);
  return (
      <>
    <li onClick={()=> handleOpen()} style={{justifyContent: 'center', listStyleType: 'none', paddingBottom: '2em'}}>
        <PersonPhotos
        personPhoto={props.personPhoto}
        />
        <br/>
        <Typography variant="h4">{props.thing}</Typography>
    </li>   
      <Modal
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      >
        {details}
      </Modal>
    </>
  );
}

export default PersonList;