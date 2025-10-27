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

export default async function MDtoPrettyCode({blog}) {

    const {data, content} = matter(blog.content)
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
    <div className="prose dark:prose-invert">
        <article dangerouslySetInnerHTML={{ __html: contentHtml }}/>
    </div>
  )
}
