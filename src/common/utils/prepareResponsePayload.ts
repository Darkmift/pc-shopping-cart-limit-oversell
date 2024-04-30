export default function buildStandartResponse({ res, data, status = 200 }) {
  return res.status(status).json({
    data,
    isSuccess: status >= 200 && status < 300,
  });
}
