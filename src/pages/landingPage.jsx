export default function LandingPage() {

    return (
        <div className="w-full h-screen bg-primary flex items-center justify-center relative">
            <video src="/720p3.mp4" autoPlay loop muted className="w-full h-full object-cover absolute top-0 left-0 z-0" />
            <div className="w-full h-full absolute top-0 left-0 z-10 bg-black/50 flex flex-col justify-center items-center gap-4">
                <h1 className="text-4xl lg:text-6xl text-white font-bold">Welcome to i-Computers</h1>
                <p className="text-white text-lg lg:text-2xl">Your one-stop shop for all your computer needs</p>
                <button className="bg-accent text-white px-4 py-2 rounded-lg text-lg lg:text-xl hover:bg-accent-dark transition-colors"><a href="/products">Shop Now</a></button>
            </div>
        </div>
    )
}