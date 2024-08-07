import React, { useState, useRef } from 'react';

export const About = () => {
  return (
    <>
    <div>
        This is an about component. 
        <p>
            The quick brown fox jumps right over the lazy dog. This is about page description. 
        </p>
    </div>
    <MarqueeComponent/>
    </>
  )
  
}


//import React, { useState, useRef } from 'react';

export const MarqueeComponent = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [scrollamt, setScrollamt] = useState(3); // State to manage scroll amount
  const marqueeRef = useRef(null);

  const startMarquee = () => {
    setIsMoving(true);
    if (marqueeRef.current) {
      marqueeRef.current.start();
    }
  };

  const stopMarquee = () => {
    setIsMoving(false);
    if (marqueeRef.current) {
      marqueeRef.current.stop();
    }
  };

  const fastMarquee = () => {
    const newScrollamt = scrollamt + 1;
    setScrollamt(newScrollamt);
    forceUpdateMarquee(newScrollamt);
  };

  const slowMarquee = () => {
    const newScrollamt = scrollamt - 1;
    setScrollamt(newScrollamt);
    forceUpdateMarquee(newScrollamt);
  };

  const forceUpdateMarquee = (newScrollamt) => {
      setScrollamt(newScrollamt); 
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        &nbsp;&nbsp;<button onClick={startMarquee} className="btn btn-success">Start</button>&nbsp;&nbsp;
        <button onClick={stopMarquee} className="btn btn-danger">Stop</button><br/><br/>
        &nbsp;&nbsp;<button onClick={fastMarquee}>Fast</button>&nbsp;&nbsp;
        <button onClick={slowMarquee}>Slow</button>
      </div>
      <marquee ref={marqueeRef} behavior="scroll" direction="left" scrollamount={scrollamt}>
        The quick brown fox jumps right over the lazy dog. This is a marquee text.
      </marquee>
    </div>
  );
};
