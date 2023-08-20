// MiddleFlexBox.js
import HumanBody from './HumanBody';

const MiddleFlexBox = ({ onPartSelected }) => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    
    <HumanBody onSelectPart={onPartSelected} />
  </div>
);

export default MiddleFlexBox;
