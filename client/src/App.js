import React from 'react';

import HomeFirstSection from './components/HomeFirstSection';
import HomeSecondSection from './components/HomeSecondSection';
import HomeBookingSection from './components/HomeBookingSection';
import HomeFourthSection from './components/HomeFourthSection';

function App() {
  return (
    <div className='page'>
    <HomeFirstSection />
    <HomeSecondSection />
    <HomeBookingSection/>
    < HomeFourthSection />
    </div>
  );
}

export default App;
