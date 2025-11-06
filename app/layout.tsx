import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NIS GI Topic Finder (2016?2021)',
  description: 'Suggest novel, high-quality gastroenterology topics suitable for HCUP NIS 2016?2021, with PubMed novelty screening focused on NIS usage.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1>NIS Gastroenterology Topic Finder</h1>
            <p className="sub">2016?2021 focus ? PubMed NIS novelty screening</p>
          </header>
          <main>{children}</main>
          <footer className="footer">
            <span>Built for rapid ideation. Always perform a full systematic search before submission.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
