import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce';

export default function TinyEditor({ setBlogContent,blogContent }: {blogContent?:string | boolean, setBlogContent: Dispatch<SetStateAction<string>> }) {
    const editorRef = useRef<{
        editorUpload: any; getContent: () => string
    } | null>(null);

    const log = (e: FormEvent) => {
        e.preventDefault();
        if (editorRef.current) {
            setBlogContent(editorRef.current.getContent());
            console.log(editorRef.current.getContent());
        }
    };

    const handleEditorChange = (content: string) => {
        console.log("called")
        setBlogContent(content); // Update state as the editor content changes
        console.log(content); // Log the current content
    };

    return (
        <>
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
                onInit={(_evt, editor) => {
                    editorRef.current = editor
                }}
                initialValue = {blogContent && typeof blogContent=="string" ?  blogContent :"<p>This is the initial content of the editor.</p>"}
                init={{
                    height: 500,
                    menubar: false,
                    advcode_inline: true,
                    theme: 'silver',
                    external_plugins: {
                        'bootstrap4grid': '/plugins/TinyMCE5/bootstrap4grid/plugin.min.js',
                    },
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',

                    content_css: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
                    content_style: `
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        body { padding: 10px; }
    `,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                        'code', 'bootstrap4grid', 'image',
                    ],
                    file_picker_callback: (cb, value, meta) => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');

                        input.addEventListener('change', (e) => {
                            const target = e.target as HTMLInputElement
                            if (target && target.files) {
                                const file = target.files[0];
                                const reader = new FileReader();
                                reader.addEventListener('load', () => {
                                    const id = 'blobid' + (new Date()).getTime();
                                    if (editorRef.current) {
                                        const blobCache = editorRef.current.editorUpload.blobCache;
                                        if (reader.result && typeof reader.result == "string") {
                                            const base64 = reader.result.split(',')[1];
                                            const blobInfo = blobCache.create(id, file, base64);
                                            blobCache.add(blobInfo);

                                            cb(blobInfo.blobUri(), { title: file.name });

                                        }
                                    } else {
                                        console.error("TinyMCE editor is not initialized yet!");
                                    }

                                });
                                reader.readAsDataURL(file);
                            }

                        })
                        input.click();
                    },
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help | code | bootstrap4grid | image',

                    setup: (editor) => {
                        editor.on("change", (e) => {
                            handleEditorChange(editorRef.current?.getContent() || "");
                        });
                        // Ensure jQuery is loaded before the plugin (add jQuery via a global script or import)
                        if (typeof window !== 'undefined' && !window.jQuery) {
                            const script = document.createElement('script');
                            script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
                            script.onload = () => {
                                console.log('jQuery loaded');
                            };
                            document.head.appendChild(script);
                        }
                    },
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}
