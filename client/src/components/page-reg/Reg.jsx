import React from 'react';
import Form from '../form/Form';
import Navbar from '../navbar/Navbar';
import './page-reg.scss';
// import { useHistory } from 'react-router';

// import { ROOMS } from '../../const';

// const roomId = ROOMS.REG_ROOM;

const Reg = () => {

  return (
    <div className="page-reg">
      <Navbar />      
      <Form pageName={'reg'}/>
    </div>
  );
}

export default Reg;
