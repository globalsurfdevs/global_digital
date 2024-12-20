import React from 'react'

const Button = ({text,className}:{
    text:string;
    className?:string;
}) => {
  return (
    <button
  className={`${className ? className : "w-fit text-font30 leading-lh1p66 border border-primary px-12 lg:px-24 rounded-full py-3 transition-all duration-300 hover:shadow-lg ease-in  hover:bg-primary hover:text-white"}`}
>
  {text}
</button>
  )
}

export default Button