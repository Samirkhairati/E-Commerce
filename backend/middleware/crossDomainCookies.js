export default function crossDomainCookies(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://e-commerce-production-ecfb.up.railway.app');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}
