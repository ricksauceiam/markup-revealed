export const metadata = {
  title: 'MarkupRevealed — See What Products Really Cost',
  description: 'Exposing brand markups on 200+ products. Paste any product link to reveal the real cost vs retail price.',
  openGraph: {
    title: 'MarkupRevealed',
    description: 'See what products really cost to make vs what brands charge you.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
