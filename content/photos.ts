/**
 * Photos used across the site. All are free to use under the Unsplash License
 * (https://unsplash.com/license): commercial use allowed, no attribution required.
 * Credits are kept here anyway. They load from Unsplash's image server via next/image
 * (allowed in next.config.ts). To self-host later, download each one into public/photos/.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  page: string;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const photos = {
  studentOutdoor: {
    src: u("photo-1675664534136-51375fb40129"),
    alt: "A student studying on a laptop on a park bench",
    width: 1600,
    height: 1067,
    credit: "Sanket Mishra",
    page: "https://unsplash.com/photos/9i2t23J7HnE",
  },
  studyGroup: {
    src: u("photo-1686624386665-4cd01b96d0f6"),
    alt: "Students working through problems together at a table",
    width: 1600,
    height: 1067,
    credit: "Aswin Thomas Bony",
    page: "https://unsplash.com/photos/SPO0ST4nVbY",
  },
  youngProfessional: {
    src: u("photo-1686249959385-ee6c7dcdf0ec"),
    alt: "A young professional working on a laptop in a bright office",
    width: 1600,
    height: 2000,
    credit: "Hasibullah Sahil",
    page: "https://unsplash.com/photos/LTDE3UZCzAM",
  },
  peerReview: {
    src: u("photo-1653503425441-9d975e51ce91"),
    alt: "Two students reviewing work together on a laptop",
    width: 1600,
    height: 2133,
    credit: "Yash Parashar",
    page: "https://unsplash.com/photos/qMnPOToyQ4c",
  },
  graduateWoman: {
    src: u("photo-1790339616267-3e7bd8aab5eb"),
    alt: "A smiling graduate in cap and gown on convocation day",
    width: 1600,
    height: 1067,
    credit: "Olek Buzunov",
    page: "https://unsplash.com/photos/mcWfPat0GJI",
  },
  campusModern: {
    src: u("photo-1635246550194-11af93a2763f"),
    alt: "Students sitting together outside a modern college building",
    width: 1600,
    height: 1067,
    credit: "SURAJ ANANDAN",
    page: "https://unsplash.com/photos/Wobgby4RX38",
  },
  campusClassic: {
    src: u("photo-1656342805779-6999524434bd"),
    alt: "A white heritage college building with a fountain and lawns",
    width: 1600,
    height: 1067,
    credit: "Ahmad Attari",
    page: "https://unsplash.com/photos/wNbF-AUC9Ag",
  },
  studentPhone: {
    src: u("photo-1667655861998-46fe4c29a4cf"),
    alt: "A smiling student with a backpack checking his phone",
    width: 1600,
    height: 1067,
    credit: "Aejaz Memon",
    page: "https://unsplash.com/photos/Qy7OZf0FUTA",
  },
  studentPortrait: {
    src: u("photo-1761124739155-2405d90a508d"),
    alt: "A smiling young woman in a red dupatta",
    width: 1600,
    height: 1067,
    credit: "Sunil Chandra Sharma",
    page: "https://unsplash.com/photos/8aW9mIG3H9w",
  },
  studentDesk: {
    src: u("photo-1683107695974-98a9fddb249a"),
    alt: "A student working through an assessment on her laptop",
    width: 1600,
    height: 1067,
    credit: "Sweet Life",
    page: "https://unsplash.com/photos/TJTw4djEhGg",
  },
  freshersTeam: {
    src: u("photo-1754531976828-69e42ce4e0d9"),
    alt: "A young team of professionals gathered around a laptop",
    width: 1600,
    height: 1067,
    credit: "Gatot Adri",
    page: "https://unsplash.com/photos/uZzjOm5vSls",
  },
  businessSchool: {
    src: u("photo-1789796720895-46d5b0c3adeb"),
    alt: "Business school students in formal suits, ready for placements",
    width: 1600,
    height: 1067,
    credit: "Poddar Business School",
    page: "https://unsplash.com/photos/NGogTxTZplQ",
  },
  techTeam: {
    src: u("photo-1681164315051-add1906a9b07"),
    alt: "A young tech team working on laptops in a bright office",
    width: 1600,
    height: 1067,
    credit: "Ofspace LLC",
    page: "https://unsplash.com/photos/TSqG5q3zRQs",
  },
} satisfies Record<string, Photo>;

export type PhotoName = keyof typeof photos;
