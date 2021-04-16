import app from './app';

const runPlatform = () => app.listen(process.env.PORT || 3000);

export default {
  run: runPlatform
};