export function CardListImagesSkeleton() {
  return (
    <section className="overflow-hidden border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 animate-pulse">
      {/* Header */}
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

      {/* Content */}

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-1 my-4 px-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="mx-auto w-full w-[300px] h-[418px]  md:h-[325px] max-w-[300px] sm:max-w-[250px] rounded bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    </section>
  );
}
