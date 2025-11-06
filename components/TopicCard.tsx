"use client";
import React from 'react';

export type TopicCardProps = {
  id: string;
  title: string;
  rationale: string;
  nisWindow: string;
  count?: number; // -1 = error
  searchUrl?: string;
};

export function TopicCard({ id, title, rationale, nisWindow, count, searchUrl }: TopicCardProps) {
  return (
    <div className="card" data-topic-id={id}>
      <h3>{title}</h3>
      <p className="small">NIS window: {nisWindow}</p>
      <p>{rationale}</p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
        <span className="badge mono">NIS novelty hits: {count === undefined ? '?' : count === -1 ? 'error' : count}</span>
        {searchUrl && (
          <a className="badge" href={searchUrl} target="_blank" rel="noreferrer">View PubMed query</a>
        )}
      </div>
    </div>
  );
}
