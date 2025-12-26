import { useState } from 'react';
// import { Menu, X, Search, Moon, Sun } from 'lucide-react';

export function Example() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navItems = ['Videos', 'Channels', 'Community', 'Upload', 'Sign In'];

  const tableData = [
    {
      id: 1,
      title: 'Charlie bit my finger',
      views: '880M',
      uploaded: 'May 22, 2007',
      length: '0:56',
    },
    {
      id: 2,
      title: 'Evolution of Dance',
      views: '305M',
      uploaded: 'Apr 6, 2006',
      length: '6:00',
    },
    {
      id: 3,
      title: 'Chocolate Rain',
      views: '133M',
      uploaded: 'Apr 22, 2007',
      length: '2:54',
    },
    {
      id: 4,
      title: 'Numa Numa',
      views: '89M',
      uploaded: 'Dec 6, 2004',
      length: '2:23',
    },
    {
      id: 5,
      title: 'Keyboard Cat',
      views: '67M',
      uploaded: 'Jun 7, 2007',
      length: '0:54',
    },
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Welcome! | Help | Sign In
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                English ▼
              </div>
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs transition-colors"
              >
                {isDark ? <>S</> : <>M</>}
                <span>{isDark ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-3">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">
                  <span className="text-red-600">You</span>
                  <span className="bg-red-600 text-white px-1">Tube</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Broadcast Yourself™
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-normal"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-700 dark:text-gray-300 p-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <>X</> : <>Menu</>}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden pb-3 border-t border-gray-200 dark:border-gray-700 pt-2 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Search Bar */}
        <div className="bg-gray-50 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-2 max-w-2xl">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium flex items-center gap-2">
                (S) Search
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Home » Videos » Most Viewed
          </div>

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-normal text-gray-800 dark:text-gray-200 mb-2">
              Most Viewed Videos
            </h1>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-blue-600 dark:text-blue-400">
                Today
              </a>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 font-bold"
              >
                This Week
              </a>
              <a href="#" className="text-blue-600 dark:text-blue-400">
                This Month
              </a>
              <a href="#" className="text-blue-600 dark:text-blue-400">
                All Time
              </a>
            </div>
          </div>

          {/* Scorecards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Total Videos
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                1,247
              </div>
              <div className="text-xs text-green-600 mt-1">↑ 23 today</div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Total Views
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                2.4B
              </div>
              <div className="text-xs text-green-600 mt-1">↑ 1.2M today</div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Active Users
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                89,432
              </div>
              <div className="text-xs text-blue-600 mt-1">online now</div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                New Uploads
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                156
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                in last hour
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    Video Title
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    Views
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    Uploaded
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300">
                    Length
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${
                      index % 2 === 0
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-gray-50 dark:bg-gray-850'
                    } hover:bg-blue-50 dark:hover:bg-gray-750 border-b border-gray-200 dark:border-gray-700`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                      {row.id}
                    </td>
                    <td className="px-4 py-3 text-sm border-r border-gray-200 dark:border-gray-700">
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      >
                        {row.title}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                      {row.views}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                      {row.uploaded}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {row.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-orange-500 text-white font-bold">
              1
            </span>
            <a
              href="#"
              className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              2
            </a>
            <a
              href="#"
              className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              3
            </a>
            <a
              href="#"
              className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Next »
            </a>
          </div>

          {/* Second Table - Cleaner Style */}
          <div className="mt-12">
            <h2 className="text-xl font-normal text-gray-800 dark:text-gray-200 mb-4">
              Top Contributors
            </h2>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead>
                  <tr className="bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="px-4 py-3 text-left text-sm font-normal text-gray-700 dark:text-gray-300">
                      Username
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-normal text-gray-700 dark:text-gray-300">
                      Videos
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-normal text-gray-700 dark:text-gray-300">
                      Subscribers
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-normal text-gray-700 dark:text-gray-300">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-4 py-3">
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                      >
                        lonelygirl15
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      342
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      1,245,890
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      Jun 2006
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-4 py-3">
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                      >
                        smosh
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      89
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      987,234
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      Nov 2005
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-4 py-3">
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                      >
                        Fred
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      156
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      823,567
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      Apr 2006
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-4 py-3">
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                      >
                        nigahiga
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      203
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      756,901
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      Jul 2006
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-4 py-3">
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                      >
                        collegehumor
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      567
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      634,289
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      Jan 2006
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Search Form */}
          <div className="mt-12 mb-8">
            <h2 className="text-xl font-normal text-gray-800 dark:text-gray-200 mb-4">
              Search Decks
            </h2>

            <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Card Name:
                  </label>
                  <input
                    type="text"
                    list="card-suggestions"
                    placeholder="Start typing card name..."
                    className="w-full px-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <datalist id="card-suggestions">
                    <option value="Black Lotus" />
                    <option value="Lightning Bolt" />
                    <option value="Counterspell" />
                    <option value="Swords to Plowshares" />
                    <option value="Dark Ritual" />
                    <option value="Giant Growth" />
                  </datalist>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Quantity:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 4"
                    className="w-full px-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Tournament */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Tournament:
                  </label>
                  <select className="w-full px-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 text-sm focus:outline-none focus:border-blue-500">
                    <option value="">All Tournaments</option>
                    <option value="pro-tour">Pro Tour</option>
                    <option value="grand-prix">Grand Prix</option>
                    <option value="world-championship">
                      World Championship
                    </option>
                    <option value="nationals">Nationals</option>
                    <option value="scg-open">SCG Open</option>
                    <option value="fnm">Friday Night Magic</option>
                  </select>
                </div>

                {/* Archetype */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Archetype:
                  </label>
                  <select className="w-full px-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 text-sm focus:outline-none focus:border-blue-500">
                    <option value="">All Archetypes</option>
                    <option value="aggro">Aggro</option>
                    <option value="control">Control</option>
                    <option value="combo">Combo</option>
                    <option value="midrange">Midrange</option>
                    <option value="tempo">Tempo</option>
                    <option value="ramp">Ramp</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Start Date:
                  </label>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    className="w-full px-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                    End Date:
                  </label>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    className="w-full px-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm">
                  Search Decks
                </button>
                <button className="ml-2 px-6 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400 justify-center">
              <a
                href="#"
                className="hover:text-gray-800 dark:hover:text-gray-300"
              >
                About
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-gray-800 dark:hover:text-gray-300"
              >
                Press & Blogs
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-gray-800 dark:hover:text-gray-300"
              >
                Copyright
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-gray-800 dark:hover:text-gray-300"
              >
                Creators & Partners
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-gray-800 dark:hover:text-gray-300"
              >
                Advertising
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-gray-800 dark:hover:text-gray-300"
              >
                Developers
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-gray-800 dark:hover:text-gray-300"
              >
                Terms
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-gray-800 dark:hover:text-gray-300"
              >
                Privacy
              </a>
            </div>
            <div className="text-center text-xs text-gray-500 mt-3">
              © 2007 YouTube, LLC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
