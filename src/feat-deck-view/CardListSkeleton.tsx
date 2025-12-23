import clsx from 'clsx';

export function CardListSkeleton() {
  return (
    <div className="md:columns-2">
      <table className="w-full border-collapse">
        <tbody className="animate-pulse">
          <tr>
            <td className="p-1 break-inside-avoid" colSpan={2}>
              <div className="h-5 w-32 rounded bg-border/60 dark:bg-border" />
            </td>
          </tr>
          {Array.from({ length: 8 }).map((_, index, array) => (
            <tr key={index}>
              <td
                className={clsx('p-1 w-8', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-6 rounded bg-border/60 dark:bg-border" />
              </td>
              <td
                className={clsx('p-1', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-40 rounded bg-border/60 dark:bg-border" />
              </td>
            </tr>
          ))}

          <tr>
            <td className="p-1 break-inside-avoid" colSpan={2}>
              <div className="h-5 w-32 rounded bg-border/60 dark:bg-border" />
            </td>
          </tr>

          {Array.from({ length: 5 }).map((_, index, array) => (
            <tr key={index}>
              <td
                className={clsx('p-1 w-8', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-6 rounded bg-border/60 dark:bg-border" />
              </td>
              <td
                className={clsx('p-1', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-40 rounded bg-border/60 dark:bg-border" />
              </td>
            </tr>
          ))}

          <tr>
            <td className="p-1 break-inside-avoid" colSpan={2}>
              <div className="h-5 w-32 rounded bg-border/60 dark:bg-border" />
            </td>
          </tr>

          {Array.from({ length: 1 }).map((_, index, array) => (
            <tr key={index}>
              <td
                className={clsx('p-1 w-8', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-6 rounded bg-border/60 dark:bg-border" />
              </td>
              <td
                className={clsx('p-1', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-40 rounded bg-border/60 dark:bg-border" />
              </td>
            </tr>
          ))}

          <tr>
            <td className="p-1 break-inside-avoid" colSpan={2}>
              <div className="h-5 w-32 rounded bg-border/60 dark:bg-border" />
            </td>
          </tr>

          {Array.from({ length: 2 }).map((_, index, array) => (
            <tr key={index}>
              <td
                className={clsx('p-1 w-8', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-6 rounded bg-border/60 dark:bg-border" />
              </td>
              <td
                className={clsx('p-1', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-40 rounded bg-border/60 dark:bg-border" />
              </td>
            </tr>
          ))}

          <tr>
            <td className="p-1 break-inside-avoid" colSpan={2}>
              <div className="h-5 w-32 rounded bg-border/60 dark:bg-border" />
            </td>
          </tr>

          {Array.from({ length: 9 }).map((_, index, array) => (
            <tr key={index}>
              <td
                className={clsx('p-1 w-8', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-6 rounded bg-border/60 dark:bg-border" />
              </td>
              <td
                className={clsx('p-1', {
                  'pb-4': index === array.length - 1,
                })}
              >
                <div className="h-5 w-40 rounded bg-border/60 dark:bg-border" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
