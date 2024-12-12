import React from 'react'

const Button = ({text,className}:{
    text:string;
    className?:string;
}) => {
  return (
    <button className={`${className ? className : "text-font30 leading-lh1p66 border border-primary px-24 rounded-full py-3  md:mb-10 xl:mt-[57px]"}`}>{text}</button>
  )
}

export default Button