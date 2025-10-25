
export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-container-xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} TicketApp — Built with care
        </div>
        <div className="text-sm text-gray-500">
          Accessibility · Privacy · Terms
        </div>
      </div>
    </footer>
  );
}
