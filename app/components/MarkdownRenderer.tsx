"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
    content: string;
    imageAltFallback?: string;
    emptyText?: string;
}

export default function MarkdownRenderer({
    content,
    imageAltFallback = "Blog illustration",
    emptyText = "Nothing to preview yet...",
}: MarkdownRendererProps) {
    if (!content || !content.trim()) {
        return <p className="text-gray-400 text-sm italic">{emptyText}</p>;
    }

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => (
                    <h1 className="text-[26px] sm:text-[32px] font-bold text-brand-darkest tracking-[-0.03em] leading-[1.15] mt-8 mb-3 first:mt-0">
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-[22px] sm:text-[26px] font-bold text-brand-darkest tracking-[-0.02em] leading-snug mt-7 mb-2 first:mt-0">
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-brand-dark mt-6 mb-2 first:mt-0">
                        {children}
                    </h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-[16px] sm:text-[17px] font-semibold text-brand-dark mt-4 mb-1.5">
                        {children}
                    </h4>
                ),
                p: ({ children }) => (
                    <p className="text-[16px] font-normal leading-[1.65] text-gray-700 mb-4 last:mb-0">
                        {children}
                    </p>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc list-outside pl-6 mb-4 space-y-1.5 text-[16px] font-normal leading-[1.65] text-gray-700">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-outside pl-6 mb-4 space-y-1.5 text-[16px] font-normal leading-[1.65] text-gray-700">
                        {children}
                    </ol>
                ),
                li: ({ children }) => (
                    <li className="text-gray-700 marker:text-brand-accent">
                        {children}
                    </li>
                ),
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand-accent/50 pl-4 pr-3 my-4 text-gray-600 italic bg-brand-lightest/30 py-2.5 rounded-r-xl">
                        {children}
                    </blockquote>
                ),
                code: ({ className, children, ...props }: any) => {
                    const isBlock = Boolean(className) || String(children).includes('\n');
                    return isBlock ? (
                        <code className="block bg-gray-50 border border-gray-200 text-gray-800 text-sm p-4 rounded-2xl overflow-x-auto font-mono mb-4 whitespace-pre" {...props}>
                            {children}
                        </code>
                    ) : (
                        <code className="bg-brand-lightest text-brand-accent text-sm px-1.5 py-0.5 rounded font-mono" {...props}>
                            {children}
                        </code>
                    );
                },
                pre: ({ children }) => <pre className="mb-4 rounded-2xl overflow-hidden">{children}</pre>,
                table: ({ children }) => (
                    <div className="my-6 w-full overflow-x-auto rounded-2xl border border-gray-200 shadow-xs bg-white">
                        <table className="w-full min-w-[540px] border-collapse text-left text-sm text-gray-700">
                            {children}
                        </table>
                    </div>
                ),
                thead: ({ children }) => (
                    <thead className="bg-brand-lightest/70 text-brand-darkest font-semibold border-b border-gray-200">
                        {children}
                    </thead>
                ),
                tbody: ({ children }) => <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>,
                tr: ({ children }) => <tr className="even:bg-gray-50/50 hover:bg-brand-lightest/25 transition-colors">{children}</tr>,
                th: ({ children }) => <th className="px-4 py-3.5 font-bold text-xs uppercase tracking-wider text-brand-darkest whitespace-nowrap border-r border-gray-200/70 last:border-r-0">{children}</th>,
                td: ({ children }) => <td className="px-4 py-3.5 align-top leading-relaxed border-r border-gray-200/60 last:border-r-0">{children}</td>,
                a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline font-medium">
                        {children}
                    </a>
                ),
                hr: () => <hr className="border-gray-200 my-6" />,
                strong: ({ children }) => <strong className="font-bold text-brand-darkest">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
                del: ({ children }) => <del className="line-through text-gray-400">{children}</del>,
                img: ({ src, alt }) => (
                    <span className="block my-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={alt || imageAltFallback} className="rounded-2xl max-w-full shadow-md" />
                    </span>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
