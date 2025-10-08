
export const debugApiResponse = (endpoint: string, response: any) => {
  console.group(`🔍 Debug API - ${endpoint}`);
  console.log('Tipo da resposta:', typeof response);
  console.log('É array?', Array.isArray(response));
  console.log('Resposta completa:', response);
  
  if (response && typeof response === 'object') {
    console.log('Chaves do objeto:', Object.keys(response));
    

    if (response.data) {
      console.log('Propriedade "data":', response.data);
      console.log('Tipo de "data":', typeof response.data);
      console.log('É array "data"?', Array.isArray(response.data));
    }
    
    if (response.articles) {
      console.log('Propriedade "articles":', response.articles);
      console.log('Tipo de "articles":', typeof response.articles);
      console.log('É array "articles"?', Array.isArray(response.articles));
    }
  }
  
  console.groupEnd();
};


export const extractArrayFromResponse = (response: any): any[] => {

  if (Array.isArray(response)) {
    return response;
  }
  

  if (response && typeof response === 'object') {

    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    if (Array.isArray(response.articles)) {
      return response.articles;
    }
    
    if (Array.isArray(response.results)) {
      return response.results;
    }
    
    if (Array.isArray(response.items)) {
      return response.items;
    }
  }
  

  console.warn('Não foi possível extrair array da resposta:', response);
  return [];
};
