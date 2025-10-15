import { useState } from 'react';

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem((current) => (current === id ? null : id));
  };

  return (
    <div className="grid gap-3">
      {items.map((item) => {
        const isOpen = openItem === item.id;

        return (
          <article
            key={item.id}
            data-accordion-item
            data-open={isOpen}
            className="focus-within:shadow-card"
          >
            <button
              type="button"
              data-accordion-trigger
              className="focus-ring"
              aria-expanded={isOpen}
              onClick={() => toggleItem(item.id)}
            >
              <span>{item.title}</span>
              <span className="text-xl">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? (
              <div data-accordion-panel>{item.content}</div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
};

export default Accordion;
