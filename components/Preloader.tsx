import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className='fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]'>
      <svg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='60' cy='50' r='35' fill='#E60012' opacity='0.1' />
        <circle cx='60' cy='50' r='30' fill='#E60012' />
        <circle cx='50' cy='45' r='3' fill='#FFFFFF' />
        <circle cx='70' cy='45' r='3' fill='#FFFFFF' />
        <g id='mouth'>
          <path
            d='M 50 58 Q 60 62 70 58'
            stroke='#FFFFFF'
            strokeWidth='2.5'
            fill='none'
            strokeLinecap='round'
          >
            <animate
              attributeName='d'
              values='M 50 58 Q 60 62 70 58;
                                   M 50 58 Q 60 58 70 58;
                                   M 50 58 Q 60 62 70 58'
              dur='0.6s'
              repeatCount='indefinite'
            />
          </path>
        </g>
        <g id='fork'>
          <rect x='85' y='35' width='2' height='25' fill='#6C757D' rx='1' />
          <rect x='82' y='32' width='1.5' height='5' fill='#6C757D' rx='0.5' />
          <rect x='85' y='32' width='1.5' height='5' fill='#6C757D' rx='0.5' />
          <rect x='88' y='32' width='1.5' height='5' fill='#6C757D' rx='0.5' />
          <circle cx='86' cy='28' r='4' fill='#FFC700' />
          <animateTransform
            attributeName='transform'
            type='translate'
            values='0,0; -20,-10; 0,0'
            dur='1.8s'
            repeatCount='indefinite'
          />
        </g>
      </svg>
      <p className='mt-4 text-sm font-semibold text-gray-700 animate-pulse'>
        Menyiapkan hidangan...
      </p>
    </div>
  );
};

export default Preloader;
