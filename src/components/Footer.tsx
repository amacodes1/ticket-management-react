
export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 px-5 py-10 border-t bg-[#9B8AFB] border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <a
          className="text-sm text-white dark:text-white/60 hover:text-[#9B8AFB] dark:hover:text-[#9B8AFB] transition-colors"
          href="#"
        >
          About
        </a>
        <a
          className="text-sm text-white dark:text-white/60 hover:text-[#9B8AFB] dark:hover:text-[#9B8AFB] transition-colors"
          href="#"
        >
          Privacy
        </a>
        <a
          className="text-sm text-white dark:text-white/60 hover:text-[#9B8AFB] dark:hover:text-[#9B8AFB] transition-colors"
          href="#"
        >
          Help
        </a>
      </div>
      <p className="text-sm text-center text-white dark:text-white/50">
        © {new Date().getFullYear()} TicketApp
      </p>
    </footer>
  );
}
