"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { generateCandidateTopics } from '@/lib/topics';
import { TopicCard } from '@/components/TopicCard';

export default function HomePage() {
  const all = useMemo(() => generateCandidateTopics(), []);
  const [counts, setCounts] = useState<Record<string, { count: number; url: string }>>({});
  const [maxCount, setMaxCount] = useState<number>(5);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const items = all.map((t) => ({ topicId: t.id, terms: t.queryTerms }));
    fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, { count: number; url: string }> = {};
        for (const r of data.results ?? []) {
          map[r.topicId] = { count: r.count, url: r.searchUrl };
        }
        setCounts(map);
      })
      .catch(() => {
        // swallow; cards will show error
      });
  }, [all]);

  const filtered = useMemo(() => {
    return all.filter((t) => {
      const c = counts[t.id]?.count;
      if (c === undefined) return true; // during load
      if (c === -1) return showErrors;
      return c <= maxCount;
    });
  }, [all, counts, maxCount, showErrors]);

  return (
    <div>
      <div className="controls">
        <label>
          <span className="small">Max NIS PubMed hits</span>
          <input
            className="input"
            type="number"
            min={0}
            max={100}
            value={maxCount}
            onChange={(e) => setMaxCount(Number(e.target.value))}
            style={{ width: 120, marginLeft: 8 }}
          />
        </label>
        <button className="button secondary" onClick={() => setShowErrors((v) => !v)}>
          {showErrors ? 'Hide' : 'Show'} items with API errors
        </button>
      </div>

      <div className="grid">
        {filtered.map((t) => (
          <TopicCard
            key={t.id}
            id={t.id}
            title={t.title}
            rationale={t.rationale}
            nisWindow={t.nisWindow}
            count={counts[t.id]?.count}
            searchUrl={counts[t.id]?.url}
          />
        ))}
      </div>
      <p className="small" style={{ marginTop: 16 }}>
        Novelty is approximated by PubMed result counts for NIS-focused queries. Always perform a comprehensive systematic search (e.g., MeSH, synonyms, preprints) prior to finalizing a topic.
      </p>
    </div>
  );
}
