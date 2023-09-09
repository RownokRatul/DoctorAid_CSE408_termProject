
import React from 'react';

import humanBodyImage from './human_body.png';
import { BorderAllRounded } from '@mui/icons-material';


// HumanBody.js
const HumanBody = ({ onSelectPart }) => {

    const BodyPart = ({ cx, cy, label, onClick }) => (
        <g>
          <circle cx={cx} cy={cy} r="1.3%" fill="#2effff" onClick={onClick} />
          <rect x={cx + 10} y={cy - 10} width={label.length * 8} height="20" fill="lightyellow" stroke="black" strokeWidth="1" rx="5" />
          <text x={cx + 15} y={cy + 3} fontFamily="Arial" fontSize="12">{label}</text>
        </g>
    );

    const handleBodyPartClick = (part) => {
        onSelectPart(part);
    };

    
  
    return (
    
    //return an image
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      
    {/* PNG background image */}
    <img src={humanBodyImage} alt="Human Body" style={{ width: '100%', height: '100%' }} />

    {/* SVG overlay with clickable regions */}
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    preserveAspectRatio="xMidYMid meet"

{/*       
      <circle cx="135" cy="70" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('head')} />  */}


            <g style={{ cursor: 'pointer' }}>
                <title>Head</title>
                {/* <circle cx="147" cy="70" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('head')} /> */}
                <circle cx="32%" cy="14%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('head')} />
            </g>
      
            <g style={{ cursor: 'pointer' }}>
                <title>Thorax</title>
                <circle cx="32%" cy="33%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('thorax')} />
            </g>
            <g style={{ cursor: 'pointer' }}>
                <title>Pelvic Region</title>
                <circle cx="32%" cy="52%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('pelvic region')} />
            </g>
            <g style={{ cursor: 'pointer' }}>
                <title>Hand</title>
                <circle cx="20%" cy="45%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('hand')} />
            </g>
            <g style={{ cursor: 'pointer' }}>
                <title>Leg</title>
                <circle cx="27%" cy="70%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('leg')} />
            </g>
            {/*... Repeat for other parts ... */}
            <g style={{ cursor: 'pointer' }}>
                <title>Brain</title>
                <circle cx="70%" cy="14%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('brain')} />
            </g>
            <g style={{ cursor: 'pointer' }}>
                <title>Lung</title>
                <circle cx="73%" cy="28%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('Lung')} />
            </g>
            <g style={{ cursor: 'pointer' }}>
                <title>Heart</title>
                <circle cx="72%" cy="32%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('Heart')} />
            </g>

            {/*  make the boarder curved*/}
            
            <g style={{ cursor: 'pointer' }}>
                <title>Stomach</title>
                <circle cx="72%" cy="38%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('stomach')} />
            </g>
            <g style={{ cursor: 'pointer' }}>
                <title>Liver</title>
                <circle cx="66%" cy="38%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('liver')} />
            </g>
            <g style={{ cursor: 'pointer' }}>
                <title>Intestine</title>
                <circle cx="70%" cy="48%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('intestine')} />
            </g>
            <g style={{ cursor: 'pointer' }}>
                <title>Kidney</title>
                <circle cx="65%" cy="52%" r="1.3%" fill="#2effff" onClick={() => handleBodyPartClick('kidney')} />
            </g>


      {/* Add other SVG elements for other parts... */}
    </svg>
  </div>
    );
  };
  
  export default HumanBody;
  