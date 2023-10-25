'use client'

import { useRouter } from "next/navigation"

const idify = (input: string) => {
    return input.toLocaleLowerCase().replace(/ /g, '-')
}

const Page = () => {
    const router = useRouter()

    return (
        <main className="flex flex-col bg-gray-100 min-h-[100dvh]">
            <header className="py-6 px-6">
                <div className="container mx-auto flex items-center justify-between gap-10">
                    <a href="/" className="text-2xl font-medium flex gap-2 items-center">
                        你好
                    </a>
                    <div className="flex gap-8 items-center">
                        <ul className="flex gap-8 text-gray-800">
                            {[
                                'Dashboard', 
                                // 'Review', 
                                // 'Learn', 
                                'Content', 
                                // 'Practice'
                            ].map((item, index) => (
                                <li key={item} className="flex items-center gap-2">
                                    {item === 'Review' && (
                                        <span className="bg-emerald-500 text-white py-1 px-1.5 font-medium text-xs rounded-full">32</span>
                                    )}
                                    <a href={`/${idify(item)}`} className="font-medium hover:text-emerald-500">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="w-8 h-8 rounded-full bg-black">

                        </div>
                    </div>
                </div>
            </header>
            <section className="flex-1">
                <div className="px-6">
                    <div className="bg-white rounded-2xl">
                        <div className="container mx-auto py-4 px-2">
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                <article className="flex justify-between items-center py-4 px-2">
                                    <main className="flex flex-col">
                                        <a href={"/review/counting"} className="flex items-center gap-2">
                                            <div className="text-lg font-medium leading-relaxed">Counting (1-10)</div>
                                            <div className="text-gray-600">
                                                算数
                                            </div>
                                        </a>
                                        <div className="leading-relaxed text-sm text-gray-500">
                                            10 Definitions
                                        </div>
                                    </main>
                                    <aside>
                                        <a
                                            href="/review/counting"
                                            className="rounded-xl border border-emerald-600 bg-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all"
                                        >
                                            Study
                                        </a>
                                    </aside>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer>

            </footer>
        </main>
    )
}

export default Page