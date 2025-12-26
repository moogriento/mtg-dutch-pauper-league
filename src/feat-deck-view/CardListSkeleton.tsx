export function CardListSkeleton() {
  const rows = [8, 5, 1, 2, 9]; // numbers of rows per section

  return (
    <div className="space-y-4">
      {rows.map((count, sectionIndex) => (
        <section
          key={sectionIndex}
          className="overflow-hidden border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 animate-pulse"
        >
          {/* Section header */}
          <div
            className="flex w-full items-center justify-between px-4 py-3
                   bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="h-4 w-3 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Section rows */}

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  {/* Count */}
                  <div className="h-5 w-8 rounded bg-gray-200 dark:bg-gray-700" />

                  {/* Card name */}
                  <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
