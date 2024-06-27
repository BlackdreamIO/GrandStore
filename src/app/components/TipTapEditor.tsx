"use client"

import React, { useState, useEffect } from 'react';
import { EditorContent, EditorProvider, useCurrentEditor, useEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';

import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import Strike from '@tiptap/extension-strike';
import TextStyle from '@tiptap/extension-text-style';
import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import BulletList from '@tiptap/extension-bullet-list';
import OrderdList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';

import '../styles/tipTapEditor.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}


export const TiptapEditor = ({ editable=true, content, onValueChange } : { editable : boolean, content : string, onValueChange? : (html : string) => void }) => {
    
    const [preMode, setPreMode] = useState(false);

    const editor = useEditor({
        extensions: [Document, Bold, Heading, Italic, ListItem, Strike, Paragraph, Text, TextStyle, Color, History, BulletList, OrderdList, Underline],
        content: content,
        injectCSS : false,
        autofocus : "all",
        editable : editable,
        onUpdate(props) {
            onValueChange?.(props.editor.getHTML());
        },

    })

    if (!editor) {
        return null;
    }    

    const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, className }) => {
        return (
            <button 
                className={`bg-neutral-900  hover:bg-neutral-800 px-4 py-2 rounded-lg ${className}`} 
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }} 
                disabled={disabled}
                type='button'
            >
                {children}
          </button>
        )
    }

    return (
        <div className="tiptap space-y-8">
            <div className={`${editable ? "flex" : "hidden"} gap-4 flex-wrap`}>
                <Button
                    onClick={() => editor.chain().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                >
                    Bold
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                >
                    Italic
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                >
                    Toggle underline
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                >
                    Strike
                </Button>
                <Button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}>
                    Paragraph
                </Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}>
                    H1
                </Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}>
                    H2
                </Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}>
                    H3
                </Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}>
                    H4
                </Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={editor.isActive('heading', { level: 5 }) ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                >
                    H5
                </Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editor.isActive('heading', { level: 6 }) ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                >
                    H6
                </Button>
                <Button
                    onClick={() => editor.chain().focus().setColor('white').run()}
                    className={editor.isActive('textStyle', { color: 'white' }) ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                    data-testid="setRed"
                >
                  Normal
                </Button>
                <Button
                    onClick={() => editor.chain().focus().setColor('skyblue').run()}
                    className={editor.isActive('textStyle', { color: 'skyblue' }) ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                    data-testid="setRed"
                >
                  Link
                </Button>
                <Button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                >
                    Bullet list
                </Button>
                <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}
                >
                    Ordered list
                </Button>
                <Button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                    Undo
                </Button>
                <Button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}
                >
                    Redo
                </Button>
                <Button onClick={() => setPreMode(!preMode)} className={preMode ? 'border-2 border-indigo-500' : 'border-2 border-neutral-800'}>
                    Custom Pre
                </Button>
            </div>
            {
                preMode && (
                    <div>
                        
                    </div>
                )
            }
            <EditorContent editor={editor} disabled={preMode} className={editable ? "bg-neutral-900 h-96" : ""} />
        </div>
    )
}