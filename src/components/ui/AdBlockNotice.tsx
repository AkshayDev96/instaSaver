import React from 'react';
import './AdBlockNotice.css'; // Assuming you're using external CSS for styles

const AdBlockNotice = () => {
  return (
    <div className='ADs-BG center hidden' id='ST1mar'>
      <div className='at-adblock-content-wrapper'>
        <div className='at-adblock-content'>
          <div className='center'>
            <div className='logo'>
              <svg style={{ width: '58px', height: '58px' }} viewBox='0 0 24 24'>
                <path
                  d='M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7'
                  fill='#b23939'
                />
              </svg>
            </div>
          </div>
          <div className='at-adblock-text'>
            <h3>Attention! Ad blocker Detected!</h3>
            <p>
              We know ads are annoying but please bear with us here & disable your ad blocker!
            </p>
          </div>
          <div className='at-adblock-button'>
            <button className='ad-btn'>Okay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBlockNotice;
