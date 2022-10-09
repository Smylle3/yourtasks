import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import EditorToolbar, { formats, modules } from "./editorToolbar";

export default function TextEditor({ task, setTask, isEdit }) {
    switch (isEdit) {
        case true:
            return (
                <div className="desc-task">
                    <EditorToolbar toolbarId={"t1"} />
                    <ReactQuill
                        theme="snow"
                        placeholder="Descrição..."
                        modules={modules("t1")}
                        formats={formats}
                        value={task.description}
                        onChange={(e) =>
                            setTask((prevState) => ({
                                ...prevState,
                                description: e,
                            }))
                        }
                    />
                </div>
            );
        case !true:
            return (
                <ReactQuill
                    className="desc-task"
                    theme="bubble"
                    placeholder="Descrição..."
                    value={task.description}
                    readOnly
                />
            );
        default:
            break;
    }
}
