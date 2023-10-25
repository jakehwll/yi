interface LayoutProps {
    children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col h-[100dvh] bg-gray-50 py-4">
            <header>
                <div className="container mx-auto px-2">
                    
                </div>
            </header>
            <section className="flex flex-col flex-1 items-center justify-center">
                <div className="container mx-auto px-2 flex flex-col items-center justify-center">
                    <div className="bg-white shadow-sm border border-gray-200 rounded-xl px-6 py-6">
                        {children}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Layout