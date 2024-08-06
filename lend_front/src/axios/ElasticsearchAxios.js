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
};
export default ElasticsearchAxios;
