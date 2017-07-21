
const Animate = (opts) => {
  const start = new Date();
  const id = setInterval(() => {
    const timePassed = new Date() - start;
    let progress = timePassed / opts.duration;
    if (progress > 1) progress = 1;
    const delta = opts.delta(progress);
    opts.step(delta);
    if (progress === 1) {
      clearInterval(id);
      if (opts.callback) opts.callback();
    }
  }, opts.delay || 10);
};

export default Animate;
