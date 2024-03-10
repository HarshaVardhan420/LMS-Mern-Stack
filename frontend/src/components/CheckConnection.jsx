import React from 'react'
import {Detector} from 'react-detect-offline'
import img from './assets/images/no-wifi.png'

const CheckConnection = props => {
  return (
        <>
           <Detector
           
             render ={({online})=> online ? props.children: 
             <div style={{ paddingTop:'10px', marginTop: '10%', textAlign: 'center' }}>
              <img src={img} alt="no connection" style={{ width:'150px', height:'150px'}}/>
                <h1 style={{ marginBottom: '5px' }}>No Connection</h1>
                <h1 style={{ margin: '0', fontSize: '14px' }}>Please check you internet Connection</h1>
             </div>
           
              }
           />
        </>
  )
}

export default CheckConnection