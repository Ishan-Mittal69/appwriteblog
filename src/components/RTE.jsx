import React from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from 'react-hook-form';
import config from '../config/config'

function RTE({name, control, label, defaultValue=""}) {
    return (

        <div>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
            name={name || "content"}
            control={control}
            render={({field: {onChange} })=>(
                <Editor
                initialValue={defaultValue}
                apiKey = {config.tinyMCE_apiKey}
                
                init={{
                    initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    plugins: [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                    ],
                    toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;  } ",
                    entity_encoding: 'raw',
                    encoding: 'xml',
                    valid_elements: '*[*]',
                    extended_valid_elements: '*[*]',
                    allow_unsafe_link_target: true,
                    convert_urls: false
                }}
                onEditorChange={onChange}
                />)}
            
            />
        </div>
        
        
    );
}

export default RTE;