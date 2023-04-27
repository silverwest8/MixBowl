import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { addressInputState, mapState } from "../../store/map";

const AutoCompleteInput = () => {
  const setMapState = useSetRecoilState(mapState);
  const [address, setAddress] = useRecoilState(addressInputState);
  const onChange = (value) => {
    setAddress(value);
  };
  const onSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      setAddress(value);
      const center = await getLatLng(results[0]);
      setMapState((state) => ({
        ...state,
        radius: 1000,
        center,
      }));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={onChange}
      onSelect={onSelect}
      searchOptions={{
        componentRestrictions: { country: "kr" },
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <AutoCompleteWrapper>
          <InputWrapper>
            <FaSearch />
            <input
              {...getInputProps({
                placeholder: "원하는 장소를 검색해보세요",
                className: "location-search-input",
              })}
            />
          </InputWrapper>
          <SuggestionWrapper>
            {loading && <div className="suggestion-item">Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item active"
                : "suggestion-item";
              return (
                <div
                  key={suggestion.description}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </SuggestionWrapper>
        </AutoCompleteWrapper>
      )}
    </PlacesAutocomplete>
  );
};

const AutoCompleteWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  border-radius: 50px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border-radius: 12px;
  padding: 0.5rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  svg {
    color: ${({ theme }) => theme.color.primaryGold};
  }
  input {
    color: black;
  }
`;

const SuggestionWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.darkGray};
  border-radius: 8px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  .suggestion-item {
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: black;
    }
    &:first-child {
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
    &:last-child {
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }
`;

export default AutoCompleteInput;
