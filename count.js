const endDate = new Date ("16 Aug, 2026 2:00:00").getTime();
const startDate = new Date ().getTime();

let x = setInterval(function updateTimer(){
  const now = new Date().getTime();
   
  const distanceCovered = now - startDate ;
  const distancePending = endDate - now;

  // calculate days, min , hrs, sec, ms(milli seconds)
  //1hours = 60*60*1000 ms
  //1min = 60*1000 ms
  //1sec = 1000 ms
  const days = Math.floor( distancePending/( 24*60*60*1000));
   const hrs = Math.floor(distancePending%(24*60*60*1000)/(60*60*1000));
    const mins = Math.floor(distancePending%(60*60*1000)/(60*1000));
     const secs = Math.floor(distancePending%(60*1000)/(1000));

     //populate in UI
     document.getElementById("days").innerHTML = days ;
     document.getElementById("hours").innerHTML = hrs ;
     document.getElementById("minutes").innerHTML = mins ;
     document.getElementById("seconds").innerHTML = secs;
     
     // calculate width percentage for progress bar
     const totalDistance =  endDate - startDate;

     const percentageDistance = (distanceCovered /totalDistance)*100;

     // set width for progress bar
     document.getElementById("progress-bar").style.width = percentageDistance + "%";
     
     if(distancePending < 0){
        clearInterval(x);
        document.getElementsById("Countdown").innerHTML = "EXPIRED";
        document.getElementById("progress-bar").style.width = "100%";
     
    }
    }
,1000);



