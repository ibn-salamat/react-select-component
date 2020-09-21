import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import DropdownArrow from "./assets/dropdown_arrow.png";

export function Select({ options: optionProp = [], handleSelectChange }) {
  const [options] = useState(optionProp); // maybe we need to change it
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [listVisibility, setListVisibility] = useState(false);

  const selectedOptionsRef = useRef([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (handleSelectChange) {
      handleSelectChange(selectedOptions);
    }
  }, [selectedOptions]);

  const selectOption = (id) => {
    setSelectedOptions([...selectedOptions, options.find((option) => option.id === id)]);
    setListVisibility(false);
    inputRef.current.focus();
    selectedOptionsRef.current = selectedOptionsRef.current.filter((el) => el); // filter null
    selectedOptionsRef.current.forEach((el) => el.classList.remove("active"));
  };

  const handleKeyDown = (e) => {
    const { target, keyCode } = e;
    switch (keyCode) {
      // backspace
      case 8:
        const isEmpty = target.value.trim().length === 0;
        if (!isEmpty) return;
        selectedOptionsRef.current = selectedOptionsRef.current.filter((el) => el); // filter null
        if (!selectedOptionsRef.current.length) return;

        const isActiveOption = selectedOptionsRef.current.find((el) =>
          el.classList.contains("active")
        );

        if (!isActiveOption) {
          selectedOptionsRef.current.forEach((el) => el.classList.remove("active"));
          selectedOptionsRef.current[selectedOptionsRef.current.length - 1].classList.add(
            "active"
          );
        } else {
          const copy = [...selectedOptions];
          copy.pop();
          setSelectedOptions(copy);
        }
        break;
      case 40:
        break;
      case 27:
        setListVisibility(false);
        inputRef.current.blur();
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setListVisibility(true);
  };

  const focusSelectedOption = ({ target }) => {
    selectedOptionsRef.current = selectedOptionsRef.current.filter((el) => el); // filter null
    selectedOptionsRef.current.forEach((el) => el.classList.remove("active"));
    target.classList.add("active");
  };

  const showList = (state) => {
    selectedOptionsRef.current = selectedOptionsRef.current.filter((el) => el); // filter null
    selectedOptionsRef.current.forEach((el) => el.classList.remove("active"));
    inputRef.current.focus();
    setListVisibility(state);
  };

  const filteredOptions = options
    .map(({ lang, country, id }) => {
      const searchValueTrimmed = searchValue.trim().toLowerCase();

      const isSearchValueEmpty = !searchValueTrimmed;
      const langMatchIndex = lang.toLowerCase().indexOf(searchValue);
      const countryMatchIndex = country.toLowerCase().indexOf(searchValue);

      const isMatch =
        isSearchValueEmpty || langMatchIndex !== -1 || countryMatchIndex !== -1;
      if (!isMatch) return;

      const isInclude = selectedOptions.find((item) => item.id === id);
      if (isInclude) return;

      return (
        <div key={id} onClick={() => selectOption(id)}>
          <p>{highlight(lang, langMatchIndex, searchValue)}</p>
          <p>{highlight(country, countryMatchIndex, searchValue)}</p>
        </div>
      );
    })
    .filter((el) => el); // to delete undefined items

  return (
    <Wrap>
      <GlobalStyles />
      {listVisibility && (
        <List>{filteredOptions.length ? filteredOptions : <p>No result</p>}</List>
      )}

      <InputWrap>
        {selectedOptions.map(({ id, lang }, i) => {
          return (
            <SelectedOption
              ref={(el) => (selectedOptionsRef.current[i] = el)}
              onClick={(e) => focusSelectedOption(e)}
              key={id}
            >
              {lang}
              <button
                onClick={() =>
                  setSelectedOptions(selectedOptions.filter((item) => item.id !== id))
                }
              >
                &times;
              </button>
            </SelectedOption>
          );
        })}

        <input
          ref={inputRef}
          placeholder="Select languages"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClick={() => showList(true)}
        />
      </InputWrap>
      <TogglerSelect onClick={() => showList(!listVisibility)} />
    </Wrap>
  );
}

const highlight = (word, index, value) => {
  return (
    <>
      {word.substring(0, index)}
      {index > -1 ? (
        <b>{word.substring(index, index + value.length)}</b>
      ) : (
        word.substring(index, index + value.length)
      )}
      {word.substring(index + value.length)}
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  body{
    font-family: Verdana;
  }
  input, button{
    border: none;
    outline: none;
  }

`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding: 10px;
  border: 1px solid #d3d9de;
  border-radius: 3px;
  position: relative;
  margin: 5px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const List = styled.div`
  border: 1px solid #c5c8cb;
  max-height: 200px;
  width: 100%;
  left: 0;
  position: absolute;
  z-index: 10;
  background: white;
  top: calc(100% + 5px);
  overflow-y: scroll;

  > div {
    margin: 0;
    border-bottom: 1px solid #c5c8cb;
    padding: 10px 5px;

    &:hover {
      background: #dae2ea;
    }

    p {
      margin: 5px 0;
    }
  }
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  background: #dae2ea;
  margin: 5px 2px;
  padding: 3px 4px;
  color: #55677d;

  &.active {
    background: #577ca1;
    color: white;
  }

  &.active button {
    color: white;
  }

  button {
    margin: 0;
    width: 20px;
    background: none;
    font-size: 24px;
    line-height: 0;
    color: #55677d;
  }
`;

const TogglerSelect = styled.button`
  height: 30px;
  width: 30px;
  background: url(${DropdownArrow}) no-repeat center;
  background-size: 15px;
  border: none;
  outline: none;
  cursor: pointer;
`;
