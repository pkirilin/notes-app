import React, { useEffect, useState } from 'react';
import { Close } from '@styled-icons/material';
import { Input } from '../../__shared__/components';
import { useDispatch } from 'react-redux';
import { getNotesRequest, searchRequest } from '../actions';

const NotesSearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermChanged, setSearchTermChanged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTermChanged && searchTerm.trim().length > 2) {
      dispatch(searchRequest(searchTerm));
    }
  }, [searchTermChanged, searchTerm]);

  useEffect(() => {
    if (searchTermChanged && searchTerm.length === 0) {
      dispatch(getNotesRequest());
    }
  }, [searchTermChanged, searchTerm]);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
    setSearchTermChanged(true);
  };

  const handleClearInput = () => {
    setSearchTerm('');
  };

  return (
    <Input
      placeholder="Search notes"
      endIcon={() => (
        <Close size="16" title="Clear" onClick={handleClearInput}></Close>
      )}
      value={searchTerm}
      onChange={handleSearchTermChange}
    ></Input>
  );
};

export default NotesSearchInput;
