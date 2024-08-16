import axios from "axios";

const ELASTIC = "http://localhost:9200";

const ElasticsearchAxios = {
  GetElastic: async (page, itemsCountPerPage) => {
    const from = (page - 1) * itemsCountPerPage;
    return await axios.get(`${ELASTIC}/final/_search`, {
      params: {
        from: from,
        size: itemsCountPerPage,
      },
    });
  },
  Getcredit_loan: async (page, itemsCountPerPage) => {
    const from = (page - 1) * itemsCountPerPage;
    return await axios.get(`${ELASTIC}/credit_loan/_search`, {
      params: {
        from: from,
        size: itemsCountPerPage,
      },
    });
  },
  Getjeonse_loan: async (page, itemsCountPerPage) => {
    const from = (page - 1) * itemsCountPerPage;
    return await axios.get(`${ELASTIC}/jeonse_loan/_search`, {
      params: {
        from: from,
        size: itemsCountPerPage,
      },
    });
  },
  Getmortgage_loan: async (page, itemsCountPerPage) => {
    const from = (page - 1) * itemsCountPerPage;
    return await axios.get(`${ELASTIC}/mortgage_loan/_search`, {
      params: {
        from: from,
        size: itemsCountPerPage,
      },
    });
  },
  Getpeoplefinloan: async (page, itemsCountPerPage) => {
    const from = (page - 1) * itemsCountPerPage;
    return await axios.get(`${ELASTIC}/peoplefinloan/_search`, {
      params: {
        from: from,
        size: itemsCountPerPage,
      },
    });
  },
  Getcredit_loan_ser: async (loan_no) => {
    return await axios.post(`${ELASTIC}/credit_loan/_search`, {
      query: {
        term: {
          순번: loan_no, // "순번" 필드명과 loan_no 값을 이용해 검색
        },
      },
    });
  },
  Getjeonse_loan_ser: async (loan_no) => {
    return await axios.post(`${ELASTIC}/jeonse_loan/_search`, {
      query: {
        term: {
          순번: loan_no, // "순번" 필드명과 loan_no 값을 이용해 검색
        },
      },
    });
  },
  Getmortgage_loan_ser: async (loan_no) => {
    return await axios.post(`${ELASTIC}/mortgage_loan/_search`, {
      query: {
        term: {
          순번: loan_no, // "순번" 필드명과 loan_no 값을 이용해 검색
        },
      },
    });
  },
  Getpeoplefinloan_ser: async (loan_no) => {
    return await axios.post(`${ELASTIC}/peoplefinloan/_search`, {
      query: {
        term: {
          순번: loan_no, // "순번" 필드명과 loan_no 값을 이용해 검색
        },
      },
    });
  },
};
export default ElasticsearchAxios;
