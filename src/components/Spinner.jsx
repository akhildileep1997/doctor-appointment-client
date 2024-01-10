import React from 'react'

function Spinner() {
  return (
    <div className="d-flex justify-content-center spinner">
<div className="spinner-grow text-success" style={{width: '4rem', height: '4rem'}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>

    </div>
  );
}

export default Spinner
