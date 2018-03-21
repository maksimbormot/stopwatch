import React, {Component, Fragment} from 'react';
import TimeButton from './TimeButton';
import { formatElapsedTime } from '../utils/formatElapsedTime';

class StopWatch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: null,
      started: false,
      stoped: false,
      timestamp:0,
      isGoing: false,
      snapTime: '00:00.00',
      pos: 0
    }
    this.results = [];
    this.timerId = null;
    this.startCount = this.startCount.bind(this);
    this.stopCount = this.stopCount.bind(this);
    this.saveResult = this.saveResult.bind(this);
    this.continueCount = this.continueCount.bind(this);
    this.resetResult = this.resetResult.bind(this);
    this.getResults = this.getResults.bind(this);
    this.timer = this.timer.bind(this);
  
  } 

  timer(startDate){ 
    const time = new Date() - startDate;
    const result = formatElapsedTime(time);
    if (result === 'Invalid time!') {        
      this.resetResult();
      return;
    }
    if (this.state.started && this.state.isGoing){
      this.setState({
        time: result,
        timestamp:time,
      });
      return;        
    }  
    this.setState({
      time: result,
      timestamp: time,
      started: true,
      isGoing: true  
    });  
  }

  startCount(){
    const startDate = this.state.timestamp? Date.now()-this.state.timestamp : Date.now();  
    this.timer(startDate);
    this.timerId = setInterval (()=>this.timer(startDate), 20);    
  }

  stopCount() {  
    this.setState({
      stoped: true      
    });
    clearInterval(this.timerId);
  }
  
  saveResult() {    
      this.setState({
      snapTime: this.state.time,
      pos: this.state.pos + 1    
    })    
    this.results.unshift({
      start: 'result',
      end: this.state.time,
      pos: this.state.pos
    })      
  }

  continueCount() {   
    this.startCount()
    this.setState({     
       stoped: false   
    })
  }

  resetResult() {
    clearInterval(this.timerId);
    this.results = [];    
    this.setState({
      time: null,
      started: false,
      stoped: false,
      isGoing: false,
      snapTime: '00:00.00',
      timestamp: 0,
      pos: 0
    })    
  }

  getResults() {
    return this.results.map((item, index) => {     
      const pos =  item.pos < 10 ? '0' + item.pos : item.pos
      return <tr key={index}>
              <td>{pos}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
            </tr>
    })    
  }   
  
  render() {
   
    let time = this.state.time === null ? '00:00.00' : this.state.time;
    
    const results = this.getResults();
    return (
      <div className="container">
        <h1>{time}</h1>
        <h3>{this.state.snapTime}</h3>
        <div className="buttons">
          {!this.state.started && 
            <TimeButton label="Start" handler={this.startCount}/>
          }
          {!this.state.stoped && this.state.isGoing &&
            <Fragment>
              <TimeButton label="Stop" handler={this.stopCount}/>         
              <TimeButton label="Lap" handler={this.saveResult}/>
            </Fragment>
          }
          {this.state.stoped && this.state.isGoing &&
            <Fragment>
              <TimeButton label="Resume" handler={this.continueCount}/>
              <TimeButton label="Reset" handler={this.resetResult} />
            </Fragment>
          }          
        </div>
         <div className="results">
          {!!this.results.length && 
            <table>
              <tbody>
                {results}
              </tbody>
            </table> 
          }       
        </div>
      </div>
    )
  }
}

export default StopWatch;
