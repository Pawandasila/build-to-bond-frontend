import React from 'react'

const Logo = () => {
  return (
    <div className={` flex items-center space-x-1`}>
      {/* Main Logo Text */}
      <div className="flex items-baseline ">
        <span className="font-marcellus text-2xl md:text-3xl lg:text-4xl font-bold text-primary-700 tracking-wide">
          Soul
        </span>
        <span className="font-marcellus text-2xl md:text-3xl lg:text-4xl font-bold text-primary-500 tracking-wide">
          ara
        </span>
      </div>
    </div>
  )
}

export default Logo