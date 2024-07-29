'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import FloatingToolbarPlugin from "./plugins/FloatingToolbar"
import {
  liveblocksConfig,
  LiveblocksPlugin,
  FloatingComposer,
  useEditorStatus,
  FloatingThreads,
} from "@liveblocks/react-lexical";
import React from 'react';
import { Loader } from '../ui/Loader';
import { useThreads } from '@liveblocks/react/suspense';
import { Thread } from '@liveblocks/react-ui';
import { Comments } from '../Comments';
import { DeleteModal } from '../DeleteModal';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({roomId , currentUserType} : {roomId : string, currentUserType:'editor' | 'viewer'}) {
  const status = useEditorStatus()
  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable:currentUserType === "editor" ? true : false
  });
  const {threads} = useThreads()
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className='flex min-w-full  justify-start sm:justify-between overflow-x-auto toolbar border-b border-gray-800'>
          <ToolbarPlugin />
          {currentUserType === "editor" && <DeleteModal roomId={roomId}/>}
        </div>
        <div className='flex flex-col px-2 lg:px-20 gap-4 xl:flex-row   mt-10'>
          <div className=' !min-h-[1100px]  w-full lg:min-w-[800px]'>
            {status === "not-loaded" || status === "loading" ? <Loader/> : (
              <div className="editor-inner min-h-[1100px] max-w-full !bg-slate-900 relative mb-5 h-fit w-full shadow-md lg:mb-10">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable className="editor-input h-full w-full !bg-slate-900" />
                  }
                  placeholder={<Placeholder />}
                  ErrorBoundary={LexicalErrorBoundary}
                />
                {currentUserType === 'editor'  && <FloatingToolbarPlugin/>}
                <HistoryPlugin />
                <AutoFocusPlugin />
              </div>
            )}
          </div>
          <LiveblocksPlugin>
            <FloatingComposer />
            <FloatingThreads  threads={threads}/>
            <Comments/>
          </LiveblocksPlugin>
        </div>
        
      </div>
    </LexicalComposer>
  );
}
