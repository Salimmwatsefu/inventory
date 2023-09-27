import React, { useState, useEffect } from 'react'

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  )
}

export default Loading