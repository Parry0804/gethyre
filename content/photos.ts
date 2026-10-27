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
  studentLaptop: {
    src: u("photo-1604177091072-b7b677a077f6"),
    alt: "A student working on a laptop on red campus steps",
    width: 1600,
    height: 1067,
    credit: "AMIT RANJAN",
    page: "https://unsplash.com/photos/3S0Ucv4BDCk",
  },
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
  campusWalk: {
    src: u("photo-1549057446-9f5c6ac91a04"),
    alt: "A group of students laughing as they walk across campus",
    width: 1600,
    height: 1067,
    credit: "Eliott Reyna",
    page: "https://unsplash.com/photos/jCEpN62oWL4",
  },
  classroom: {
    src: u("photo-1571260899304-425eee4c7efc"),
    alt: "Students writing in a college classroom",
    width: 1600,
    height: 1067,
    credit: "javier trueba",
    page: "https://unsplash.com/photos/iQPr1XkF5F0",
  },
  campusBuilding: {
    src: u("photo-1568626231555-03e303627953"),
    alt: "A historic stone university building under a clear sky",
    width: 1600,
    height: 2133,
    credit: "Sopan Shewale",
    page: "https://unsplash.com/photos/RXZO4d9SznI",
  },
  campusLawn: {
    src: u("photo-1680084521816-cc1ad0433ceb"),
    alt: "A college building beyond a wide green lawn",
    width: 1600,
    height: 1067,
    credit: "Shashank Raghuvanshi",
    page: "https://unsplash.com/photos/PJHeL-Cy8rM",
  },
  graduate: {
    src: u("photo-1495995424756-6a5a3f9e7543"),
    alt: "A smiling graduate holding his graduation cap",
    width: 1600,
    height: 1067,
    credit: "Muhammad Rizwan",
    page: "https://unsplash.com/photos/VnydpKiCDaY",
  },
  youngProfessional: {
    src: u("photo-1686249959385-ee6c7dcdf0ec"),
    alt: "A young professional working on a laptop in a bright office",
    width: 1600,
    height: 2000,
    credit: "Hasibullah Sahil",
    page: "https://unsplash.com/photos/LTDE3UZCzAM",
  },
  hiringTeam: {
    src: u("photo-1577962917302-cd874c4e31d2"),
    alt: "A hiring team in a meeting in a modern office",
    width: 1600,
    height: 1067,
    credit: "Smartworks Coworking",
    page: "https://unsplash.com/photos/cW4lLTavU80",
  },
  recruiter: {
    src: u("photo-1771244688590-1e481dba1b5a"),
    alt: "A hiring manager at his desk with a laptop",
    width: 1600,
    height: 1067,
    credit: "Skytech Aviation",
    page: "https://unsplash.com/photos/kgc1vAw1Tl8",
  },
  peerReview: {
    src: u("photo-1653503425441-9d975e51ce91"),
    alt: "Two students reviewing work together on a laptop",
    width: 1600,
    height: 2133,
    credit: "Yash Parashar",
    page: "https://unsplash.com/photos/qMnPOToyQ4c",
  },
} satisfies Record<string, Photo>;

export type PhotoName = keyof typeof photos;
