import React, { useState, useMemo, useEffect } from 'react';
import './Publication.css';

// ---------------------------------------------------------------------------
// Icons (inline SVG — no external icon package required)
// ---------------------------------------------------------------------------
const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconCalendar = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconFile = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);
const IconEye = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconUser = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevronRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconX = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconBadge = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);
const IconInbox = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Sample data — replace with data from your API
// ---------------------------------------------------------------------------
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const PAPERS = [
  {
    id: 'IJPSAR001',
    title: 'Modern React Development',
    date: '18 Jun 2026',
    status: 'Published',
    author: { name: 'Aditya Ranjan Sahoo', id: 'AUT-1042' },
    version: { label: 'Version 1', tag: 'PUBLISHED' },
    feedback: 'The paper has been reviewed successfully. Please update the methodology section and replace Figure 3 with the latest high-resolution image before final publication.',
    reviewer: 'Prasanta Kumar Khuntia',
    reviewedAt: '30 Jun 2026 • 5:27 PM',
  },
  {
    id: 'IJPSAR002',
    title: 'Digital Marketing Trends',
    date: '15 Jun 2026',
    status: 'Published',
    author: { name: 'Priya Nanda', id: 'AUT-1088' },
    version: { label: 'Version 2', tag: 'PUBLISHED' },
    feedback: 'The reviewer recommends adding more recent references related to AI-based marketing strategies and improving the conclusion section.',
    reviewer: 'Dr. S. Mohanty',
    reviewedAt: '28 Jun 2026 • 11:10 AM',
  },
  {
    id: 'IJPSAR003',
    title: 'Business Growth Strategy',
    date: '12 Jun 2026',
    status: 'Published',
    author: { name: 'Rajesh Kumar Patra', id: 'AUT-1015' },
    version: { label: 'Version 1', tag: 'PUBLISHED' },
    feedback: 'Excellent work. Only minor grammatical corrections are required before publication.',
    reviewer: 'Prof. A. Das',
    reviewedAt: '26 Jun 2026 • 2:45 PM',
  },
  {
    id: 'IJPSAR004',
    title: 'Cloud Infrastructure Security',
    date: '06 May 2026',
    status: 'In Revision',
    author: { name: 'Manas Ranjan Behera', id: 'AUT-1103' },
    version: { label: 'Version 1', tag: 'REVISION' },
    feedback: 'Please strengthen the threat-model section with recent CVE data and clarify the encryption benchmarks in Table 2.',
    reviewer: 'Dr. R. Panda',
    reviewedAt: '10 May 2026 • 4:02 PM',
  },
  {
    id: 'IJPSAR005',
    title: 'Sustainable Supply Chains',
    date: '21 Apr 2026',
    status: 'Published',
    author: { name: 'Swagatika Mishra', id: 'AUT-1027' },
    version: { label: 'Version 3', tag: 'PUBLISHED' },
    feedback: 'Final version accepted. Great use of primary field data across three regions.',
    reviewer: 'Prof. A. Das',
    reviewedAt: '24 Apr 2026 • 9:15 AM',
  },
  {
    id: 'IJPSAR006',
    title: 'Neural Networks in Healthcare',
    date: '03 Mar 2026',
    status: 'Rejected',
    author: { name: 'Debasish Jena', id: 'AUT-1071' },
    version: { label: 'Version 1', tag: 'REJECTED' },
    feedback: 'The dataset size is insufficient to support the clinical claims made in Section 4. Resubmission with expanded trial data is welcome.',
    reviewer: 'Dr. S. Mohanty',
    reviewedAt: '09 Mar 2026 • 1:30 PM',
  },
  {
    id: 'IJPSAR007',
    title: 'Consumer Behaviour in E-Commerce',
    date: '19 Feb 2026',
    status: 'Published',
    author: { name: 'Ananya Pattnaik', id: 'AUT-1059' },
    version: { label: 'Version 2', tag: 'PUBLISHED' },
    feedback: 'Well-structured survey methodology. Approved for the February issue without further changes.',
    reviewer: 'Prasanta Kumar Khuntia',
    reviewedAt: '22 Feb 2026 • 3:47 PM',
  },
  {
    id: 'IJPSAR008',
    title: 'Renewable Energy Economics',
    date: '11 Jan 2026',
    status: 'In Revision',
    author: { name: 'Bikash Chandra Sethi', id: 'AUT-1096' },
    version: { label: 'Version 1', tag: 'REVISION' },
    feedback: 'Please add a sensitivity analysis for the cost projections and cite the latest IEA figures.',
    reviewer: 'Dr. R. Panda',
    reviewedAt: '15 Jan 2026 • 10:05 AM',
  },
  {
    id: 'IJPSAR009',
    title: 'Blockchain in Public Records',
    date: '28 Dec 2025',
    status: 'Published',
    author: { name: 'Suresh Chandra Nayak', id: 'AUT-1004' },
    version: { label: 'Version 1', tag: 'PUBLISHED' },
    feedback: 'Solid contribution to the field. Approved for publication in the December archive issue.',
    reviewer: 'Prof. A. Das',
    reviewedAt: '30 Dec 2025 • 6:20 PM',
  },
];

const PAGE_SIZE = 3;

// Parse "18 Jun 2026" -> { day, month (0-11), year, week (1-5 within month) }
function parsePaperDate(str) {
  const [dayStr, monStr, yearStr] = str.split(' ');
  const day = parseInt(dayStr, 10);
  const month = MONTH_NAMES.findIndex((m) => m.toLowerCase().startsWith(monStr.toLowerCase()));
  const year = parseInt(yearStr, 10);
  const week = Math.ceil(day / 7);
  return { day, month, year, week };
}

const STATUS_CLASS = {
  Published: 'pub-badge--published',
  'In Revision': 'pub-badge--revision',
  Rejected: 'pub-badge--rejected',
};

const VERSION_TAG_CLASS = {
  PUBLISHED: 'pub-card__version-tag--published',
  REVISION: 'pub-card__version-tag--revision',
  REJECTED: 'pub-card__version-tag--rejected',
};

const Publication = () => {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [weekFilter, setWeekFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const enriched = useMemo(
    () => PAPERS.map((p) => ({ ...p, _parsed: parsePaperDate(p.date) })),
    []
  );

  const years = useMemo(
    () => Array.from(new Set(enriched.map((p) => p._parsed.year))).sort((a, b) => b - a),
    [enriched]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enriched.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q) ||
        p.author.id.toLowerCase().includes(q);
      const matchesYear = yearFilter === 'all' || p._parsed.year === Number(yearFilter);
      const matchesMonth = monthFilter === 'all' || p._parsed.month === Number(monthFilter);
      const matchesWeek = weekFilter === 'all' || p._parsed.week === Number(weekFilter);
      return matchesSearch && matchesYear && matchesMonth && matchesWeek;
    });
  }, [enriched, search, yearFilter, monthFilter, weekFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, yearFilter, monthFilter, weekFilter]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
  );

  const hasActiveFilters =
    search !== '' || yearFilter !== 'all' || monthFilter !== 'all' || weekFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setYearFilter('all');
    setMonthFilter('all');
    setWeekFilter('all');
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="pub-portal">
      {/* ------------------------------------------------------------- */}
      {/* Header                                                        */}
      {/* ------------------------------------------------------------- */}
      <header className="pub-portal__header">
        <div className="pub-portal__heading-group">
          <span className="pub-portal__eyebrow">Manuscript Tracker</span>
          <h1 className="pub-portal__title">Published Papers Portal</h1>
          <p className="pub-portal__subtitle">
            Browse your submitted papers, publication status, and editor feedback organized by section.
          </p>
        </div>
        <div className="pub-portal__stats">
          <div className="pub-portal__stat">
            <span className="pub-portal__stat-value">{PAPERS.length}</span>
            <span className="pub-portal__stat-label">Total Papers</span>
          </div>
          <div className="pub-portal__stat">
            <span className="pub-portal__stat-value">
              {PAPERS.filter((p) => p.status === 'Published').length}
            </span>
            <span className="pub-portal__stat-label">Published</span>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* Filters                                                       */}
      {/* ------------------------------------------------------------- */}
      <section className="pub-filters" aria-label="Filter papers">
        <div className="pub-filters__search">
          <IconSearch className="pub-filters__search-icon" width={17} height={17} />
          <input
            type="text"
            className="pub-filters__search-input"
            placeholder="Search by title, paper ID, or author…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search papers"
          />
        </div>

        <div className="pub-filters__group">
          <label className="pub-filters__label" htmlFor="year-select">Year</label>
          <select
            id="year-select"
            className="pub-filters__select"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="pub-filters__group">
          <label className="pub-filters__label" htmlFor="month-select">Month</label>
          <select
            id="month-select"
            className="pub-filters__select"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="all">All months</option>
            {MONTH_NAMES.map((m, idx) => (
              <option key={m} value={idx}>{m}</option>
            ))}
          </select>
        </div>

        <div className="pub-filters__group">
          <label className="pub-filters__label" htmlFor="week-select">Week</label>
          <select
            id="week-select"
            className="pub-filters__select"
            value={weekFilter}
            onChange={(e) => setWeekFilter(e.target.value)}
          >
            <option value="all">All weeks</option>
            <option value="1">Week 1</option>
            <option value="2">Week 2</option>
            <option value="3">Week 3</option>
            <option value="4">Week 4</option>
            <option value="5">Week 5</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button type="button" className="pub-filters__clear" onClick={clearFilters}>
            <IconX width={14} height={14} />
            Clear filters
          </button>
        )}
      </section>

      <p className="pub-portal__result-count">
        Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'paper' : 'papers'}
        {hasActiveFilters ? ' matching your filters' : ''}
      </p>

      {/* ------------------------------------------------------------- */}
      {/* Cards grid                                                    */}
      {/* ------------------------------------------------------------- */}
      {pageItems.length > 0 ? (
        <div className="pub-portal__grid">
          {pageItems.map((paper) => (
            <article
              key={paper.id}
              className={`pub-card pub-card--${paper.status.toLowerCase().replace(' ', '-')}`}
            >
              <div className="pub-card__header">
                <div className="pub-card__heading">
                  <h2 className="pub-card__title">{paper.title}</h2>
                  <div className="pub-card__id">
                    <IconFile width={14} height={14} />
                    {paper.id}
                  </div>
                  <div className="pub-card__byline">
                    <IconBadge width={13} height={13} />
                    {paper.author.name}
                    <span className="pub-card__byline-divider">•</span>
                    {paper.author.id}
                  </div>
                </div>
                <span className={`pub-badge ${STATUS_CLASS[paper.status]}`}>
                  <span className="pub-badge__dot" />
                  {paper.status}
                </span>
              </div>

              <div className="pub-card__meta">
                <div className="pub-card__meta-item">
                  <span className="pub-card__meta-label">Paper ID</span>
                  <span className="pub-card__meta-value">{paper.id}</span>
                </div>
                <div className="pub-card__meta-item">
                  <span className="pub-card__meta-label">Date</span>
                  <span className="pub-card__meta-value">{paper.date}</span>
                </div>
                <div className="pub-card__meta-item">
                  <span className="pub-card__meta-label">Author</span>
                  <span className="pub-card__meta-value pub-card__meta-value--truncate">
                    {paper.author.name}
                  </span>
                </div>
                <div className="pub-card__meta-item">
                  <span className="pub-card__meta-label">Author ID</span>
                  <span className="pub-card__meta-value">{paper.author.id}</span>
                </div>
              </div>

              <div className="pub-card__version">
                <div className="pub-card__version-header">
                  <span className="pub-card__version-badge">{paper.version.label}</span>
                  <span className={`pub-card__version-tag ${VERSION_TAG_CLASS[paper.version.tag]}`}>
                    {paper.version.tag}
                  </span>
                </div>

                <p className="pub-card__feedback">{paper.feedback}</p>

                <div className="pub-card__reviewer">
                  <span className="pub-card__reviewer-line">
                    <IconUser width={13} height={13} />
                    {paper.reviewer}
                  </span>
                  <span className="pub-card__reviewer-line">
                    <IconCalendar width={13} height={13} />
                    {paper.reviewedAt}
                  </span>
                </div>
              </div>

              <button type="button" className="pub-card__cta">
                <IconEye width={16} height={16} />
                View Paper
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="pub-empty">
          <IconInbox className="pub-empty__icon" width={40} height={40} />
          <h3 className="pub-empty__title">No papers match these filters</h3>
          <p className="pub-empty__text">Try adjusting your search or clearing the filters below.</p>
          <button type="button" className="pub-empty__clear" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Pagination                                                    */}
      {/* ------------------------------------------------------------- */}
      {filtered.length > 0 && (
        <nav className="pub-pagination" aria-label="Pagination">
          <button
            type="button"
            className="pub-pagination__btn pub-pagination__btn--nav"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IconChevronLeft width={15} height={15} />
            Previous
          </button>

          <div className="pub-pagination__pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`pub-pagination__btn pub-pagination__btn--page ${
                  page === currentPage ? 'pub-pagination__btn--active' : ''
                }`}
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="pub-pagination__btn pub-pagination__btn--nav"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <IconChevronRight width={15} height={15} />
          </button>
        </nav>
      )}
    </div>
  );
};

export default Publication;