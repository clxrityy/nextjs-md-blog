"use client";
import "@/styles/ui.css";
import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = ({ ...props }: InputProps) => {
  return (<input 
    {...props}
   />);
}

export default Input;