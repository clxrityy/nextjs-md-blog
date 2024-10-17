"use client";

import { ComponentPropsWithoutRef } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import "@/styles/mde.css";

type EditorProps = ComponentPropsWithoutRef<typeof ReactMde>;

const Editor = ({ ...props }: EditorProps) => {
    return (
        <ReactMde
            value={props.value}
            onChange={props.onChange}
            selectedTab={props.selectedTab}
            onTabChange={props.onTabChange}
            generateMarkdownPreview={props.generateMarkdownPreview}
            maxEditorHeight={props.maxEditorHeight}
            minEditorHeight={props.minEditorHeight}
        />
    )
}

export default Editor;