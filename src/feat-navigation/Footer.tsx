export function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <nav className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs text-gray-600 dark:text-gray-400">
          {/* <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
            About
          </a>
          <span className="text-gray-400 dark:text-gray-600">|</span> */}

          <span className="italic">
            Go forth with honor, return with glory.
          </span>
        </nav>

        <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{' '}
        </div>
      </div>
    </footer>
  );
}
