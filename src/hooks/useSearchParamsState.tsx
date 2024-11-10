import { useSearchParams } from 'react-router-dom';

export function useSearchParamsState(
  searchParamName: string,
  defaultValue: string | string[],
): readonly [
  searchParamsState: string | string[],
  setSearchParamsState: (newState: string | string[]) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get and decode the parameter value, ensuring it matches the type expected
  const acquiredSearchParam = searchParams.get(searchParamName);
  const paramState: string | string[] = acquiredSearchParam
    ? decodeURIComponent(acquiredSearchParam).split(',')
    : defaultValue;

  // Function to update the URL parameter with the new state value
  const updateSearchParamsState = (newState: string | string[]) => {
    const nextParams = Object.fromEntries(searchParams.entries());

    // Encode array items back into a single string if it's an array
    nextParams[searchParamName] = Array.isArray(newState)
      ? encodeURIComponent(newState.join(','))
      : newState;

    setSearchParams(nextParams);
  };

  return [paramState, updateSearchParamsState];
}
