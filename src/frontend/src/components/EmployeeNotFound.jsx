import React from 'react'
import { Link } from 'react-router-dom';

const EmployeeNotFound = () => {
    return (
        <div className="not-found">
        <div className="content">
          <h2>Sorry</h2>
          <p>That page cannot be found</p>
          <Link to="/">Back to the homepage...</Link>
        </div>
      </div>
    )
}

export default EmployeeNotFound;