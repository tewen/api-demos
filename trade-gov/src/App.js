import React, { useState, useRef } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { useAPI } from 'react-api-hooks';
import { InputGroup, Spinner } from '@blueprintjs/core';
import qs from 'qs';
import DataTable from './components/DataTable';
import "@blueprintjs/core/lib/css/blueprint.css";
import './App.css';

const Container = styled.div`
  padding: 10px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  padding: 10px;
  flex: 1;
`;

const TripleCol = styled.div`
  padding: 10px;
  flex: 3;
`;

function App() {
  // This should be placed in an env file
  const token = '';
  const [query, setQuery] = useState();
  const inputRef = useRef();
  const { response, isLoading } = useAPI(`https://api.trade.gov/gateway/v1/trade_leads/search?${qs.stringify({ q: query, size: 100 })}`, {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  });

  const handleSearch = _.debounce(e => {
    const newQuery = _.get(e, 'target.value', _.get(inputRef, 'current.value'));
    console.log(`Setting query to ${newQuery}.`);
    setQuery(newQuery);
  }, 500);

  return (
    <Container>
      <Row>
        <Col>
          <InputGroup leftIcon="filter"
                      placeholder="Search for industry..."
                      inputRef={inputRef}
                      large={true}
                      onChange={handleSearch} />
        </Col>
        <TripleCol>
          {isLoading || !query ? <Spinner /> : <DataTable data={_.get(response, 'data.results')} />}
        </TripleCol>
      </Row>
    </Container>
  );
}

export default App;
