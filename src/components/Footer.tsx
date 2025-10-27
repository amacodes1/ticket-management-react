export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 px-5 py-10 border-t bg-[#9B8AFB] dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <a
          className="text-sm text-white hover:text-white/80 dark:text-gray-300 dark:hover:text-white transition-colors"
          href="#"
        >
          About
        </a>
        <a
          className="text-sm text-white hover:text-white/80 dark:text-gray-300 dark:hover:text-white transition-colors"
          href="#"
        >
          Privacy
        </a>
        <a
          className="text-sm text-white hover:text-white/80 dark:text-gray-300 dark:hover:text-white transition-colors"
          href="#"
        >
          Help
        </a>
      </div>
      <p className="text-sm text-center text-white/90 dark:text-gray-400">
        © {new Date().getFullYear()} TicketApp
      </p>
    </footer>
  );
}
