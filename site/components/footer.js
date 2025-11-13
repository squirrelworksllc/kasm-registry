export default function Footer() {
return (
    <footer className="footer bg-brand-50 border-t border-brand-200">
    <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between text-sm">
        <div className="flex items-center gap-2 text-brand-700">
            <img src="/logo-mark.svg" alt="Logo mark" className="h-4" />
            <span>© {new Date().getFullYear()} Squirrel Works</span>
        </div>
        <div className="flex items-center gap-3">
            <a href="/privacy" className="text-brand-700 hover:text-brand-900">Privacy</a>
            <a href="/terms" className="text-brand-700 hover:text-brand-900">Terms</a>
            <button className="btn-ghost">Subscribe</button>
        </div>
    </div>
    </footer>
);
}