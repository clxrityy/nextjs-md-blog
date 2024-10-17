"use client";
import "@/styles/ui.css";
import React, { ComponentPropsWithoutRef } from "react";

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

const Textarea = ({ ...props }: TextareaProps) => {
  return (
  <textarea {...props} />
);
};

export default Textarea;