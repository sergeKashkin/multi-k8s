export default () => ({
  outBox: process.env.OUTBOX || 'http://localhost:3000',
  delivery: process.env.DELIVERY || 'http://localhost:3002',
  payment: process.env.PAYMENT || 'http://localhost:50051',
});
