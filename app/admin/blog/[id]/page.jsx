import React from 'react'
import matter from 'gray-matter'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers'
import { getBlogById } from '@/lib/blogFetch';
import AdminPostEditable from '@/app/components/AdminPostEditable'


export default async function page({params}) {
    const blog = await getBlogById(params.id);

    if(!blog.content){
        return <div className='container mx-auto py-8'>Post dont have data</div>
    }
    
    const {content} = matter(blog.content)
    
    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument, {title: 'My Blog'})
        .use(rehypeFormat)
        .use(rehypePrettyCode, {
        theme:'github-dark',
        lineNumbers: true,
        transformers: [
        transformerCopyButton({
            visibility: 'always',
            feedbackDuration: 3_000,
        }),
        ],
        })
        .use(rehypeStringify)

        const contentHtml = (await processor.process(content)).toString()

    return (
        <div className='w-full flex-center'>
            <AdminPostEditable 
            contentHtml={contentHtml} 
            blog={blog}/>
        </div>
    )
}
