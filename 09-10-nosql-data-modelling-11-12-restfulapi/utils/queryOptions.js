function buildSort(sort, allowedFields, defaultField = 'createdAt', order = 'asc') {
  const requested = sort || defaultField;
  const defaultDirection = String(order).toLowerCase() === 'desc' ? -1 : 1;
  const fields = requested.split(',').map((field) => field.trim()).filter(Boolean);
  const result = {};

  for (const field of fields) {
    const descending = field.startsWith('-') || defaultDirection === -1;
    const fieldName = field.startsWith('-') ? field.slice(1) : field;
    if (allowedFields.includes(fieldName)) {
      result[fieldName] = descending ? -1 : 1;
    }
  }

  return Object.keys(result).length > 0 ? result : { [defaultField]: 1 };
}

function buildProjection(fields, allowedFields) {
  if (!fields) return '-__v';

  const requestedFields = fields
    .split(',')
    .map((field) => field.trim())
    .filter(Boolean);
  const excludeId = requestedFields.includes('-_id');
  const selected = requestedFields
    .filter((field) => field !== '-_id' && allowedFields.includes(field));

  if (selected.length === 0 && excludeId) return '-_id';
  if (selected.length === 0) return '-__v';
  return `${selected.join(' ')}${excludeId ? ' -_id' : ''}`;
}

function buildPagination(page, limit) {
  const currentPage = Math.max(parseInt(page, 10) || 1, 1);
  const requestedLimit = Math.max(parseInt(limit, 10) || 10, 1);

  return {
    page: currentPage,
    limit: Math.min(requestedLimit, 50),
    skip: (currentPage - 1) * Math.min(requestedLimit, 50)
  };
}

module.exports = { buildSort, buildProjection, buildPagination };
