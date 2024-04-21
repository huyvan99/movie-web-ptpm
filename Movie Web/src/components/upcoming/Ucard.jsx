import React from "react"
import { Link } from "react-router-dom"

const Ucard = ({ item: { id, cover, name, time } }) => {
  return (
    <>
      <div className='MovieBox'>
        <div className='img'>
          <img src={cover} alt='' />
        </div>
        <div className='text'>
          <h3>{name}</h3>
          <span>{time}</span> <br />
          {/*<Link to={`/singlepage/${id}`}>*/}
          <button style={{ cursor: 'pointer', background: '#e50813', outline: 'none', border: 'none', color: '#fff', padding: '12px 20px', fontWeight: '500', fontSize: '13px' }} className='primary-btn'>
            <i className='fa fa-play'></i> PLAY NOW
          </button>
          {/*</Link>*/}
        </div>
      </div>
    </>
  )
}

export default Ucard
