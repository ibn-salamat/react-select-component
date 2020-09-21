import React from "react";
import { Select } from "./select";

const initial_languages = [
  {
    lang: "Қазақша",
    country: "Kazakhstan",
    id: 0,
  },
  {
    lang: "Русский",
    country: "Россия",
    id: 1,
  },
  {
    lang: "English",
    country: "USA",
    id: 2,
  },
  {
    lang: "English",
    country: "UK",
    id: 3,
  },
  {
    lang: "Arabic",
    country: "Saudia",
    id: 4,
  },
  {
    lang: "Italian",
    country: "Italy",
    id: 5,
  },
  {
    lang: "Spanish",
    country: "Spain",
    id: 6,
  },
];

function App() {
  return (
    <>
      <Select
        options={initial_languages}
        handleSelectChange={(value) => console.log(value)}
      />

      <Select
        options={initial_languages}
        handleSelectChange={(value) => console.log(value)}
      />

      <Select
        options={initial_languages}
        handleSelectChange={(value) => console.log(value)}
      />
    </>
  );
}

export default App;
