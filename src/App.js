import React, { useReducer } from "react";
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
  const [state, setState] = useReducer((prevState, newState) => {
    return {
      ...prevState, ...newState
    }
  }, {
    select1: null,
    select2: null,
    select3: null
  })
  return (
    <div style={{display: 'flex', flexDirection: "column", alignItems: 'center'}}>
      <br />
      <br />

      Select1: 
      <br />
      <br />

      <code>{JSON.stringify(state.select1)}</code>

      <br />

      Select2: 
      <br />
      <br />

      <code>{JSON.stringify(state.select2)}</code>

      <br />

      Select3: 
      <br />
      <br />

      <code>{JSON.stringify(state.select3)}</code>
      <br />
      <Select
        options={initial_languages}
        handleSelectChange={(value) => 
          setState({select1: value})
        }
      />

      <Select
        options={initial_languages}
        handleSelectChange={(value) => {
          setState({select2: value})
        }}
      />

      <Select
        options={initial_languages}
        handleSelectChange={(value) => {
          setState({select3: value})

        }}
      />
    </div>
  );
}

export default App;
