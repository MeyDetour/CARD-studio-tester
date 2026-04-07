export function serializeParams(params) {
  const serializedParams = typeof params === 'object' 
    ? JSON.stringify(params).replace(/"/g, '&quot;') 
    : `'${params}'`;
return serializedParams;
}