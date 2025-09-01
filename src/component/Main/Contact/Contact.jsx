import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import ParticleScene from '../Particle/Particle';
import './Contact.css';

function Contact() {
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();

    // 입력 체크
    if (!name || !email || !message) {
        setStatusMessage("모든 내용을 채워주세요.");
        return; // 내용 없으면 전송 중단
    }

    setStatusMessage('전송 중...');

    // EmailJS 전송
    emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )

      .then(
        (result) => {
          console.log(result.text);
          setStatusMessage('메일이 성공적으로 전송되었습니다!');
        },
        (error) => {
          console.log(error.text);
          setStatusMessage('메일 전송 실패... 다시 시도해주세요.');
        }
      );

    form.reset();
  };

  return (
    <div className="cont-main-div">
        <div className='cont-inner-wrapper'>
            <div className='cont-form-div'>
            <form onSubmit={sendEmail}>
                <input
                className="input-tag-des"
                type="text"
                name="user_name"
                placeholder="성함"
                required
                />
                <input
                className="input-tag-des"
                type="email"
                name="user_email"
                placeholder="연락처 / 이메일"
                required
                />
                <textarea
                className="input-tag-des text-area-des"
                style={{ resize: "none" }}
                name="message"
                placeholder="메시지 내용"
                required
                />
                <button className='submit-btn' type="submit">보내기</button>
            </form>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
            </div>
            <div className='cont-right-img-div'>
            <h2>Contact Me</h2>
            </div>
        </div>
        <div className='back-particle-div'>
            <ParticleScene />
        </div>
    </div>
  );
}

export default Contact;
