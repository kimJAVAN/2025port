import React, {useState} from 'react';
import './SubPortfolio.css';

const portfolioData = [
  {
    title: "프로젝트 A",
    img: "이미지A",
    date: "2025-09-03",
    content: "프로젝트 A 내용",
    team: "참여인원 A",
    link: "https://example.com/A",
  },
  {
    title: "프로젝트 B",
    img: "이미지B",
    date: "2025-08-15",
    content: "프로젝트 B 내용",
    team: "참여인원 B",
    link: "https://example.com/B",
  },
  {
    title: "프로젝트 C",
    img: "이미지C",
    date: "2025-07-22",
    content: "프로젝트 C 내용",
    team: "참여인원 C",
    link: "https://example.com/C",
  },
  {
    title: "프로젝트 C",
    img: "이미지C",
    date: "2025-07-22",
    content: "프로젝트 C 내용",
    team: "참여인원 C",
    link: "https://example.com/C",
  },
  {
    title: "프로젝트 C",
    img: "이미지C",
    date: "2025-07-22",
    content: "프로젝트 C 내용",
    team: "참여인원 C",
    link: "https://example.com/C",
  },
  {
    title: "프로젝트 C",
    img: "이미지C",
    date: "2025-07-22",
    content: "프로젝트 C 내용",
    team: "참여인원 C",
    link: "https://example.com/C",
  },
];

function SubPortfolio() {

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index); 
  };

  return (
    <div className='sub-popol-wrapper'>
      <div className='sub-inner-wrap'>
        {portfolioData.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              className={`sub-popol-unit ${isActive ? 'active' : ''}`}
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: isActive ? '40%' : '20%', 
                transition: 'width 0.4s ease',
              }}
            >
              <div 
                className='sub-popol-front'
                style={{ width: isActive ? '50%' : '100%' }}
              >
                <div className='sub-popol-title'>
                  <p>{item.title}</p>
                </div>
                <div className='sub-popol-img'>
                  <div>{item.img}</div>
                </div>
                <div className='sub-popol-date'>
                  <p>{item.date}</p>
                </div>
              </div>
              <div
                className='sub-popol-back'
                style={{
                  left: isActive ? '50%' : '0%',
                  transition: 'left 0.4s ease',
                  position: 'absolute',
                }}
              >
                <div className='sub-context'>
                  <p>{item.content}</p>
                </div>
                <div className='sub-context'>
                  <p>{item.team}</p>
                </div>
                <div className='sub-popol-link'>
                  <p>{item.link}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubPortfolio;