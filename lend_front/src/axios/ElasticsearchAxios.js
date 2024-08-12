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
};
export default ElasticsearchAxios;
