

export const formatElapsedTime = function(date){  
  try{
      const hours = Math.floor(date / (1000 * 60 * 60));
      if (hours){
          date = date - (1000 * 60 * 60 * hours);
      }
      
      const minutes = Math.floor(date / (1000 * 60));
      if (minutes){
          date = date - (1000 * 60 * minutes);
      }

      const seconds = Math.floor(date / 1000);
      if(seconds){        
          date = date - seconds * 1000;          
      }
      if (date >= 1000 ){
        date = date / 100;
      }
      if (date >= 100 ){
        date = date / 10;
      }
      date = date.toFixed(0);
      if(parseInt(date) < 10){
        date = '0' + date;
      }             
      const showHours = hours ? hours >= 10 ? hours + ':' : '0' + hours + ':' : '';
      const showMinutes = minutes ? minutes >= 10 ? minutes + ':' : '0' + minutes + ':' : '00:';
      const showSeconds = seconds ? seconds >= 10 ? seconds + '.' : '0' + seconds + '.' : '00.';
      const milliSeconds = date !== '0' ? date : '00';
      return showHours + showMinutes + showSeconds + milliSeconds;
  }
  catch(err){
      return 'Invalid time!';
  }
  
}
