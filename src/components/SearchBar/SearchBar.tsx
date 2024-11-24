import { useSearchParamsState } from '@/hooks';
import MagnifyingGlass from '../../assets/images/magnifying-glass-icon.svg?react';
import { StyledSearchBarContainer } from './SearchBar.styled';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {};
type Inputs = {
  q: string;
};

export const SearchBar = (props: Props) => {
  const [paramState, updateSearchParamsState] = useSearchParamsState('q', '');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data =>
    updateSearchParamsState(data.q);
  return (
    <StyledSearchBarContainer onSubmit={handleSubmit(onSubmit)}>
      <MagnifyingGlass className="magnifyingGlassIcon" />
      <input
        type="text"
        className="searchBar"
        placeholder="Search"
        defaultValue={paramState}
        {...register('q')}
      />
    </StyledSearchBarContainer>
  );
};
