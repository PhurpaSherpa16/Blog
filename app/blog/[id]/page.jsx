import { getBlogById } from '@/lib/blogFetch';
import React from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers'



export default async function page({params}) {
    const blog = await getBlogById(params.id);

    if(!blog.mdContent){
        return <div className='container mx-auto py-8'>Post dont have data</div>
    }
    
    const {data, content} = matter(blog.mdContent)
    const processor = await unified()
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
        <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-gray-500">{blog.date} | {blog.author}</p>
        <img src={blog.image} alt={blog.title} className="my-4 rounded-lg" />
        <div className="prose dark:prose-invert">
            <article dangerouslySetInnerHTML={{ __html: contentHtml }}/>
        </div>
        </div>
    )
}
