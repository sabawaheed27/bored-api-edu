'use client';

import { useEffect, useState } from 'react';
import './homeComponent.scss';

interface Fact {
  text: string;
  source: string;
}

export default function HomeComponent() {
  const [fact, setFact] = useState<Fact | null>(null);

  const fetchFact = async () => {
    try {
      const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setFact({
        text: data.text,
        source: data.source,
      });
    } catch (error) {
      console.error("Failed to fetch fact:", error);
    }
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <section className="wrapper">
      <h2>Here's a random fun fact for you:</h2>
      {fact && (
        <div className="card">
          <p>{fact.text}</p>
          <p><strong>Source:</strong> {fact.source}</p>
        </div>
      )}
      <button className="button" onClick={fetchFact}>Get New Fact</button>
    </section>
  );
}
