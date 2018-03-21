import { formatElapsedTime } from './formatElapsedTime';
import React from 'react';
import ReactDOM from 'react-dom';


  it('must return error', () => {
    expect(formatElapsedTime()).toEqual('Invalid time!');
  })
  it('must return trutly', () => {
    expect(formatElapsedTime(9100)).toEqual('00:09.10');
  })

 