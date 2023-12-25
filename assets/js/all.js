async function fetchCell({
  gSheetId,
  wSheetName,
  range,
  query,
  accessToken,
}) {
  let url = `https://docs.google.com/spreadsheets/d/${gSheetId}/gviz/tq?tqx=out:csv`;
  if (wSheetName) url += `&sheet=${wSheetName}`;
  if (range) url += `&range=${range}`;
  if (query) url += `&tq=${query}`;
  if (accessToken) url += `&access_token=${accessToken}`;

  // fetch Google Visualization API
  let response = await fetch(url);
  if (response.status != 200) return [];

  let body = await response.text();
  return body;
}
