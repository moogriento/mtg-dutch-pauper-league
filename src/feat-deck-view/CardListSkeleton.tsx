import React from 'react';
import clsx from 'clsx';

export function CardListSkeleton() {
  const rows = [8, 5, 1, 2, 9]; // numbers of rows per section

  return (
    <div className="md:columns-2">
      <table className="w-full border-collapse">
        <tbody className="animate-pulse">
          {rows.map((count, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {/* Section header */}
              <tr>
                <td className="p-1 break-inside-avoid" colSpan={2}>
                  <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                </td>
              </tr>

              {/* Section rows */}
              {Array.from({ length: count }).map((_, index, array) => (
                <tr key={index}>
                  <td
                    className={clsx('p-1 w-8', {
                      'pb-4': index === array.length - 1,
                    })}
                  >
                    <div className="h-5 w-6 rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td
                    className={clsx('p-1', {
                      'pb-4': index === array.length - 1,
                    })}
                  >
                    <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
